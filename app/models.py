from datetime import datetime, timezone
from sqlalchemy import PrimaryKeyConstraint, String, Integer, Column, Text, ForeignKey, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import relationship
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import random, string

SALT_LEN = 16

def soundex(name):
    name = name.upper()
    soundex_code = name[0]
    mapping = {
        "BFPV": "1", "CGJKQSXZ": "2", "DT": "3",
        "L": "4", "MN": "5", "R": "6"
    }
    
    for char in name[1:]:
        for key, value in mapping.items():
            if char in key:
                if soundex_code[-1] != value:
                    soundex_code += value
                break
        else:
            if char not in "AEIOUYHW":
                soundex_code += "0"

    soundex_code = soundex_code[:4].ljust(4, '0')
    return soundex_code

@event.listens_for(Engine, "connect")
def register_soundex_function(dbapi_connection, connection_record):
    dbapi_connection.create_function("SOUNDEX", 1, soundex)

class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    email_ext = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    password_salt = Column(String(SALT_LEN), nullable=False)
    created_at = Column(String, nullable=False)
    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)
    image_url = Column(Text, nullable=True)

    def __init__(self:str, email:str, email_ext:str, password:str, first_name:str, last_name:str, image_url:str):
        self.email = email
        self.email_ext = email_ext
        self.password_salt = User.generate_salt()
        self.password_hash = generate_password_hash(password + self.password_salt)
        self.first_name = first_name.capitalize()
        self.last_name = last_name.capitalize()
        self.image_url = image_url
        self.created_at = datetime.now(timezone.utc).isoformat()

    def __repr__(self):
        return f"<User {self.email}>"

    def update_password(self, new_password):
        self.password_hash = generate_password_hash(new_password + self.password_salt)

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
    user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'), nullable=True)
    event_name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(String, nullable=False)  # ISO format text for SQLite
    end_time = Column(String, nullable=True)     # ISO format text for SQLite
    location = Column(Text, nullable=False)
    created_at = Column(String, nullable=False)
    image_url = Column(Text, nullable=True)

    # Relationship to User
    user = relationship('User', backref='events')

    def __init__(self, event_name: str, description: str, start_time:str, end_time:str, location:str, image_url:str, user_id):
        self.event_name = event_name
        self.description = description
        self.start_time = start_time
        self.end_time = end_time
        self.location = location
        self.created_at = datetime.now(timezone.utc).isoformat()
        self.image_url = image_url
        self.user_id = user_id

    def __repr__(self):
        return f"<Event {self.id, self.event_name}>"

class EventRegister(db.Model):
    __tablename__ = 'event_register'

    user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    event_id = Column(Integer, ForeignKey('event.id', ondelete='CASCADE'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'event_id'),  # Composite primary key
    )

    user = relationship('User', backref='event_register')
    event = relationship('Event', backref='event_register')

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