from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models import User, BlacklistedToken
from datetime import timedelta, datetime, timezone
from functools import wraps
import re, jwt, os
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__, url_prefix="/api/auth/")

PASSWORD_LENGTH = current_app.config['PASSWORD_LENGTH']
JWT_SECRET = current_app.config['JWT_SECRET']
JWT_EXPIRATION = current_app.config['JWT_EXPIRATION']

def is_valid_password(password: str):
    if len(password) < PASSWORD_LENGTH:
        return False
    if (not re.search(r"[A-Z]", password) or
        not re.search(r"[a-z]", password) or
        not re.search(r"[0-9]", password) or
        not re.search(r"[!@#$%^&*()]", password)):
        return False
    return True

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+(\+[a-zA-Z0-9._%+-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    return bool(re.match(email_regex, email))

# passes in valid email
def normalize_email(email: str):
    email = email.lower()
    username, domain = email.split('@')
    if '+' in username:
        username, tag = username.split('+', 1)
    else:
        tag = None
    main_email = f"{username}@{domain}"
    
    return main_email, tag


def generate_jwt(user: User):
    if not user:
        raise ValueError("User object cannot be None")
     
    expiration = (datetime.now(timezone.utc) + JWT_EXPIRATION).isoformat()
    payload = {
        'user_id': user.id,
        'expiry': expiration
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token

def verify_jwt(token: str):
    try:
        decoded_payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        if BlacklistedToken.query.filter_by(token=token).first():
            return None
        return decoded_payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Exception):
        return None
    
def get_jwt_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    try:
        return auth_header.split(" ")[1]  # "Bearer <token>"
    except IndexError:
        return None

def authorize_request():
    token = get_jwt_token()
    if not token:
        return None, jsonify({"success": False, "message": "Malformed Token."}), 400
    
    decoded_token = verify_jwt(token)
    if not decoded_token:
        return None, jsonify({"success": False, "message": "Invalid or expired JWT token."}), 401

    user_id = decoded_token.get('user_id')
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return None, jsonify({"success": False, "message": "User not found."}), 404

    return user, None, 200

def invalidate_jwt_token():
    token = get_jwt_token()
    decoded_token = verify_jwt(token)
    
    expiry_date = decoded_token.get("expiry")
    
    invalid_jwt = BlacklistedToken(token=token, expiry_date=expiry_date)
    
    db.session.add(invalid_jwt)
    db.session.commit()

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user, error, code = authorize_request()
        if error:
            return error, code
        return f(user, *args, **kwargs)
    return decorated_function

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    image_url = data.get("image_url", "")

    if not email or not is_valid_email(email):
        return jsonify({
            "success": False,
            "message": "Invalid email format. Please provide a valid email address."
        }), 400

    if not password or not is_valid_password(password):
        return jsonify({
            "success": False,
            "message": f"Invalid password. It must contain at least {PASSWORD_LENGTH} characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character '!, @, #, $, %, ^, &, *, (, )'"
        }), 400

    if not first_name or not last_name:
        return jsonify({
            "success": False,
            "message": "First name and last name are required."
        }), 400

    normalized_email, ext = normalize_email(email)
    # Has to use the normalized email since
    # mail+tag@mail.com
    # mail@mail.com
    # are the same email, but users can add +tag
    # to mark where the email is signed up to
    # this avoids this type of duplication
    existing_user = User.query.filter_by(email=normalized_email).first()
    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already in use."
        }), 409


    new_user = User(
        email=normalized_email,
        email_ext=ext,
        password=password,
        first_name=first_name,
        last_name=last_name,
        image_url=image_url
    )

    db.session.add(new_user)
    db.session.commit()

    token = generate_jwt(new_user)

    return jsonify({
        "success": True,
        "token": token,
        "message": "User registered successfully."
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    normalized_email = normalize_email(email)[0]
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = User.checkpassword(normalized_email, password)
    if not user:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    token = generate_jwt(user)

    return jsonify({"success": True, "message": "Logged in successfully.", "token": token}), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required
def logout(user):
    invalidate_jwt_token()
    return jsonify({"success": True, "message": "Logged out successfully."}), 200

@auth_bp.route('/delete_account', methods=['DELETE'])
@jwt_required
def delete_account(user):
    invalidate_jwt_token()
    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User account deleted successfully."}), 200

@auth_bp.route('/update_user_info', methods=['PUT'])
@jwt_required
def update(user):
    try:
        data = request.get_json()

        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.image_url = data.get("image_url", user.image_url)

        db.session.commit()

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "An error occurred while updating user info."
        }), 500

@auth_bp.route('/get_user', methods=['GET'])
@jwt_required
def update_user_info(user):
    return jsonify({
        "success": True,
        "user_info": {
                "user_id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "image_url": user.image_url
            },
        "message": "Success."
    }), 200

@auth_bp.route('/change_password', methods=['PUT'])
@jwt_required
def change_password(user):
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')
        new_password = data.get('new_password')

        if not email or not is_valid_email(email):
            return jsonify({
                "success": False,
                "message": "Invalid email format. Please provide a valid email address."
            }), 400
        normalized_email = normalize_email(email)[0]

        if not password or not is_valid_password(password):
            return jsonify({
                "success": False,
                "message": f"Invalid password. It must contain at least {PASSWORD_LENGTH} characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character '!, @, #, $, %, ^, &, *, (, )'"
            }), 400
        
        if User.checkpassword(email=normalized_email, password=password):
            if not new_password or not is_valid_password(new_password):
                return jsonify({
                    "success": False,
                    "message": f"Invalid password. It must contain at least {PASSWORD_LENGTH} characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character '!, @, #, $, %, ^, &, *, (, )'"
                }), 400
            user.update_password(new_password)
            db.session.commit()
        return jsonify({"success": True, "message": "Password updated successfully."}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "An error occurred while changing the password."
        }), 500