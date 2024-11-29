import os
from datetime import timedelta

class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_EXPIRATION = timedelta(days=14)
    PASSWORD_LENGTH = 8

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'  # In-memory SQLite database for tests
    JWT_SECRET = "test_key_jwt"

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    JWT_SECRET = "dev_key_jwt"

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///prod.db'

    def __init__(self):
        self.JWT_SECRET = os.getenv("JWT_SECRET")
    
        if not self.JWT_SECRET:
            raise ValueError("JWT_SECRET not set.")

config_options = {
    'testing': TestConfig,
    'development': DevelopmentConfig,
    'production': ProductionConfig
}