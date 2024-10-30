import pytest
from app import create_app, db
from app.models import User
import random, string

@pytest.fixture(scope="function")  # Change to "function" scope
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

def test_registration_success(client):
    response = client.post('/auth/register', 
        json={
            "email": "User+tag@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })

    print(response.get_json())
    assert response.status_code == 201

    # Make sure the same user can't register twice

    reg_user = User.query.filter_by(email="user@mail.com").first()
    print(reg_user.email)
    print(reg_user.email_ext)
    assert reg_user is not None
    assert reg_user.email == "user@mail.com"
    assert reg_user.email_ext == "tag"

    response = client.post('/auth/register', 
        json={
            "email": "User+test@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })

    print(response.get_json())
    assert response.status_code == 409