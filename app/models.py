from datetime import datetime, timedelta, timezone
from sqlalchemy import CheckConstraint, PrimaryKeyConstraint, String, Integer, Column, Text, ForeignKey
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import random, string
from flask import current_app

SALT_LEN = 16

class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    email_ext = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    password_salt = Column(String(SALT_LEN), nullable=False)
    created_at = Column(String, default=datetime.now(timezone.utc).isoformat, nullable=False)
    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)

    def __init__(self:str, email:str, email_ext:str, password:str, first_name:str, last_name:str):
        self.email = email
        self.email_ext = email_ext
        self.password_salt = User.generate_salt()
        self.password_hash = generate_password_hash(password + self.password_salt)
        self.first_name = first_name.capitalize()
        self.last_name = last_name.capitalize()

    def __repr__(self):
        return f"<User {self.email}>"

    @staticmethod
    def checkpassword(email:str, password:str):
        user = User.query.filter_by(email=email).first()
        if not user:
            return None
        if user and check_password_hash(user.password_hash, password + user.password_salt):
            return user
        else:
            return None

    @staticmethod
    def generate_salt(length:int=SALT_LEN) -> str:
        """Generates a random salt for hashing passwords."""
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(length))
    
    
class Event(db.Model):
    __tablename__ = 'event'
    
    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    event_name = Column(Text, nullable=False)
    description = Column(Text, CheckConstraint('LENGTH(description) <= 500'), nullable=True)  # Limit to 500 characters
    start_time = Column(String, nullable=False)  # ISO format text for SQLite
    end_time = Column(String, nullable=True)     # ISO format text for SQLite
    location = Column(Text, nullable=False)
    created_at = Column(String, default=datetime.now(timezone.utc).isoformat, nullable=False)

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
    
    token = Column(String, primary_key=True, nullable=False)
    expiry_date = Column(String, nullable=True) 

    def __init__(self, token, expiry_date):
        self.token = token
        self.expiry_date = expiry_date

    def __repr__(self):
        return f'<BlacklistedToken(token_hash={self.token}, expires={self.expiry_date})>'
    
    def blacklist_token(token: str):
        hash