import pytest
from app import create_app, db
from app.models import User
import random, string, json
from tests.resources import *

def test_registration_success(client):
    response = client.post('/api/auth/register', 
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

    response = client.post('/api/auth/register', 
        json={
            "email": "User+test@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })
    print(response.get_json())
    assert response.status_code == 409

    response = client.post('/api/auth/register', 
        json={
            "email": "user@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })
    print(response.get_json())
    assert response.status_code == 409

    response = client.post('/api/auth/register', 
        json={
            "email": "uSer+letmein@mail.com",
            "password": "1a!B1234absdfasdf",
            "firstName": "John",
            "lastName": "Smith"
        })
    print(response.get_json())
    assert response.status_code == 409

def test_stress_email_validation(client):
    try:
        with open(emails_test_set_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)

        print()
        for k, v in data.items():
            print(k)
            print(v)
            response = client.post('/api/auth/register', json=v["data"])
            print(response.get_json())
            assert response.status_code == v["status_code"]
    except FileNotFoundError:
        assert False, f"Error: The file '{emails_test_set_path}' was not found."
    except json.JSONDecodeError:
        assert False, f"Error: The file '{emails_test_set_path}' contains invalid JSON."
    except Exception as e:
        assert False, f"An unexpected error occurred: {e}"

def test_stress_password_validation(client):
    try:
        with open(password_test_set_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)

        print()
        for k, v in data.items():
            print(k)
            print(v)
            response = client.post('/api/auth/register', json=v["data"])
            print(response.get_json())
            assert response.status_code == v["status_code"]
    except FileNotFoundError:
        assert False, f"Error: The file '{password_test_set_path}' was not found."
    except json.JSONDecodeError:
        assert False, f"Error: The file '{password_test_set_path}' contains invalid JSON."
    except Exception as e:
        assert False, f"An unexpected error occurred: {e}"

def test_stress_name_validation(client):
    try:
        with open(name_test_set_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)

        print()
        for k, v in data.items():
            print(k)
            print(v)
            response = client.post('/api/auth/register', json=v["data"])
            print(response.get_json())
            assert response.status_code == v["status_code"]
    except FileNotFoundError:
        assert False, f"Error: The file '{name_test_set_path}' was not found."
    except json.JSONDecodeError:
        assert False, f"Error: The file '{name_test_set_path}' contains invalid JSON."
    except Exception as e:
        assert False, f"An unexpected error occurred: {e}"
