from datetime import datetime, timedelta, timezone
from sqlalchemy import CheckConstraint, PrimaryKeyConstraint
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import random, string, os, hashlib

SALT_LEN = 16

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    email_ext = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    password_salt = db.Column(db.String(SALT_LEN), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)


    def __init__(self, email, email_ext, password, first_name, last_name):
        self.email = email
        self.email_ext = email_ext
        self.password_salt = User.generate_salt()
        self.password_hash = generate_password_hash(password + self.password_salt)
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f"<User {self.email}>"

    @staticmethod
    def checkpassword(email, password):
        user = User.query.filter_by(email=email).first()
        if not user:
            return None
        if user and check_password_hash(user.password_hash, password + user.password_salt):
            return user
        else:
            return None

    @staticmethod
    def generate_salt(length=SALT_LEN):
        """Generates a random salt for hashing passwords."""
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(length))
    
    
class Event(db.Model):
    __tablename__ = 'event'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, CheckConstraint('LENGTH(description) <= 500'), nullable=True)  # Limit to 500 characters
    event_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=True)  # Optional end time
    location = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)

    # Relationship to User
    user = db.relationship('User', backref='events')

    def __repr__(self):
        return f"<Event {id, self.event_name}>"

    def __init__(self, event_name : str, description : str, start_time, end_time, location):
        self.event_name = event_name
        self.description = description
        self.start_time = start_time
        self.end_time = end_time
        self.location = location

class EventRegister(db.Model):
    __tablename__ = 'event_register'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    __table_args__ = (
        db.PrimaryKeyConstraint('user_id', 'event_id'),  # Composite primary key
    )

    def __repr__(self):
        return f"<EventRegister user_id={self.user_id}, event_id={self.event_id}>"
    
    def __init__(self, user_id, event_id):
        self.user_id = user_id
        self.event_id = event_id

class BlacklistedToken(db.Model):
    __tablename__ = 'blacklisted_tokens'

    # We use the hashed JWT as the primary key since it's unique
    token = db.Column(db.String, primary_key=True, nullable=False)
    expiry_date = db.Column(db.Time, nullable=False)

    def __init__(self, token, expiry):
        self.token = token
        self.expiry_date = expiry

    def __repr__(self):
        return f'<BlacklistedToken(token_hash={self.token}, expires={self.expiry_date})>'
    
    def blacklist_token(token: str):
        hash