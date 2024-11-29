# conftest.py
import pytest
from app import create_app, db
from app.models import User

@pytest.fixture(scope="function")
def app():
    """Set up the Flask app for testing."""
    app = create_app('testing')
    with app.app_context():
        db.create_all()  # Create tables before each test
        yield app
        db.drop_all()  # Drop tables after each test

@pytest.fixture
def client(app):
    """Provide a test client for the app."""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Provide a test CLI runner for the app."""
    return app.test_cli_runner()
