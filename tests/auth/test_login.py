import pytest
from app import create_app, db
from app.models import User, BlacklistedToken
import random, string, json
from tests.resources import *

def test_login(client):
    response = client.post('/auth/register', 
        json={
            "email": "User+tag@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })

    print(response.get_json())
    token = response.get_json()["token"]
    print(token)
    assert response.status_code == 201
    blacklisted_token_count = db.session.query(BlacklistedToken).count()
    assert blacklisted_token_count == 0
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = client.post('/auth/logout', headers=headers)
    assert response.status_code == 200

    blacklisted_token_count = db.session.query(BlacklistedToken).count()
    assert blacklisted_token_count == 1

    response = client.post('/auth/login', json={
            "email": "User+tag@mail.com",
            "password": "1a!B1234"
        }
    )

    assert response.status_code == 200

def test_invalid_login(client):
    response = client.post('/auth/register', 
        json={
            "email": "User+tag@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith"
        })

    print(response.get_json())
    token = response.get_json()["token"]
    print(token)

    assert response.status_code == 201

    headers = {
        "Authorization": f"Bearer"
    }

    response = client.post('/auth/logout', headers=headers)
    assert response.status_code == 400

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = client.post('/auth/logout', headers=headers)
    assert response.status_code == 200

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = client.post('/auth/logout', headers=headers)
    assert response.status_code == 401


    