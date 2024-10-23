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
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET = os.getenv("JWT_SECRET")
    if not SECRET_KEY:
        print("SECRET_KEY not set")
        exit()

    if not JWT_SECRET:
        print("JWT_SECRET not set.")
        exit()

config_options = {
    'testing': TestConfig,
    'development': DevelopmentConfig,
    'production': ProductionConfig
}