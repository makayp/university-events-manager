import os

class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    SECRET_KEY = "test_key"
    JWT_SECRET = "test_key_jwt"
    TESTING = True

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SECRET_KEY = "dev_key"
    JWT_SECRET = "dev_key_jwt"
    DEBUG = True

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///prod.db'

    def __init__(self):
        self.SECRET_KEY = os.getenv("SECRET_KEY")
        self.JWT_SECRET = os.getenv("JWT_SECRET")
        
        if not self.SECRET_KEY:
            raise ValueError("SECRET_KEY not set.")
        if not self.JWT_SECRET:
            raise ValueError("JWT_SECRET not set.")

config_options = {
    'testing': TestConfig,
    'development': DevelopmentConfig,
    'production': ProductionConfig
}