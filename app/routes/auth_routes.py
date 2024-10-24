from flask import Blueprint, request, jsonify
from app import db
from app.models import User, BlacklistedToken
from datetime import timedelta, datetime, timezone
from functools import wraps
import re, jwt, os

auth_bp = Blueprint('auth', __name__, url_prefix="/auth/")

password_length = 8
JWT_SECRET = os.getenv('JWT_SECRET')
JWT_EXPIRATION = timedelta(days=14)

if not JWT_SECRET:
    print("JWT secret key not set.")

def is_valid_password(password: str):
    if len(password) < password_length:
        return False
    if (not re.search(r"[A-Z]", password) or
        not re.search(r"[a-z]", password) or
        not re.search(r"[0-9]", password) or
        not re.search(r"[!@#$%^&*()]", password)):
        return False
    return True

def is_valid_email(email):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
    if re.match(regex, email):
        return True
    else:
        return False

def normalize_email(email: str):
    email = email.lower()
    local_part, domain = email.split('@', 1)
    local_part, ext = local_part.split('+', 1)
    return f"{local_part}@{domain}", ext

def generate_jwt(user: User):
    if not user:
        raise ValueError("User object cannot be None")
     
    payload = {
        'user_id': user.id,
        'exp': datetime.now(timezone.utc) + JWT_EXPIRATION
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token

def verify_jwt(token: str):
    try:
        decoded_payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        # Check if the token is blacklisted
        if BlacklistedToken.query.filter_by(token=token).first():
            return None
        return decoded_payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Exception):
        return None
    
def authorize_request():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None, None, jsonify({"success": False, "message": "Token is missing."}), 401

    try:
        token = auth_header.split(" ")[1]  # "Bearer <token>"
    except IndexError:
        return None, None, jsonify({"success": False, "message": "Malformed authorization header."}), 400

    decoded_token = verify_jwt(token)
    if not decoded_token:
        return None, None, jsonify({"success": False, "message": "Invalid or expired JWT token."}), 401

    user_id = decoded_token.get('user_id')
    user = User.query.get(user_id)

    if not user:
        return None, None, jsonify({"success": False, "message": "User not found."}), 404

    return user, token, None

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user, error = authorize_request()
        if error:
            return error
        return f(user, *args, **kwargs)
    return decorated_function

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('username')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    # Validate email
    if not email or not is_valid_email(email):
        return jsonify({
            "success": False,
            "message": "Invalid email format. Please provide a valid email address."
        }), 400

    # Validate password
    if not password or not is_valid_password(password):
        return jsonify({
            "success": False,
            "message": f"Invalid password. It must contain at least {password_length} characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character '!, @, #, $, %, ^, &, *, (, )'"
        }), 400

    # Validate first and last name
    if not first_name or not last_name:
        return jsonify({
            "success": False,
            "message": "First name and last name are required."
        }), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already in user."
        })

    normalized_email, ext = normalize_email(email)

    new_user = User(
        email=normalized_email,
        email_ext=ext,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )

    db.session.add(new_user)
    db.session.commit()

    token = generate_jwt(new_user)

    return jsonify({
        "success": True,
        "token": token,  # Return the JWT token
        "message": "User registered successfully."
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = User.check_password(email, password)
    if not user:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    token = generate_jwt(user)

    return jsonify({"success": True, "message": "Logged in successfully.", "token": token}), 200

@auth_bp.route('/auth/logout', methods=['POST'])
@jwt_required
def logout(user, token):
    decoded_token = verify_jwt(token)

    expiry_date = datetime.fromtimestamp(decoded_token.get("exp"), timezone.utc)
    invalid_jwt = BlacklistedToken(token=hash, expiry_date=expiry_date)
    
    db.session.add(invalid_jwt)
    db.session.commit()

    return jsonify({"success": True, "message": "Logged out successfully."}), 200

@auth_bp.route('/delete_account', methods=['DELETE'])
@jwt_required
def delete_account(user, token):
    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User account deleted successfully."}), 200