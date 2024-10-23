import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from config import config_options

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
def create_app():
    # Get the FLASK_ENV environment variable, default to 'development' if not set
    config_name = os.getenv('FLASK_ENV', 'development')

    if config_name not in config_options:
        print(f"Incorrect Config Settings. Choose : {config_options}")
        exit(1)  # Exit if the config is incorrect

    print(f"MODE: {config_name}")

    app = Flask(__name__)
    app.config.from_object(config_options[config_name])

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    with app.app_context():
        # Import your models after initializing the app context
        from app import models

    return app