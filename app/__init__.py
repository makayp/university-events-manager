import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config_options

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name=None):
    if not config_name:
        config_name = os.getenv('FLASK_ENV', 'development')

    if config_name not in config_options:
        raise ValueError(f"Incorrect Config Settings. Choose one of: {list(config_options.keys())}")

    app = Flask(__name__)
    app.config.from_object(config_options[config_name])

    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        from app import models
        from app.routes.auth_routes import auth_bp
        from app.routes.event_routes import event_bp

        app.register_blueprint(auth_bp)
        app.register_blueprint(event_bp)
    return app