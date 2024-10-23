from app import db
from app.models import User
from werkzeug.security import generate_password_hash

def test_user_creation():
    password_salt = User.generate_salt()
    print(password_salt)
    print(User.generate_verification_token())
    password_hash = generate_password_hash('testpassword' + password_salt)

    new_user = User(email='test2@example.com', passwordHash=password_hash, passwordSalt=password_salt)
    
    print(f"User created: {new_user}")

if __name__ == '__main__':
    test_user_creation()