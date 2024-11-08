import pytest
from app import create_app, db
from app.models import User, BlacklistedToken
import random, string, json
from tests.resources import *
from datetime import datetime, timedelta, timezone

def test_event_creation(client):
    response = client.post('/api/auth/register', 
        json={
            "email": "User+tag@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })

    token = response.get_json()["token"]
    print(token)
    # Prepare test data
    start = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()
    end = (datetime.now(timezone.utc) + timedelta(days=2)).isoformat()
    print(start, end)
    
    # Send POST request with valid data
    response = client.post(
        '/api/events/create',
        json={
        "event_name": "Test Event",
        "description": "This is a test event.",
        "start_time": start,
        "end_time": end,
        "location": "Test Location",
        "image_url": "http://example.com/image.png"
    },
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    # Assertions
    assert response.status_code == 201

    response = client.post(
        '/api/events/create',
        json={
        "event_name": "Test Event",
        "description": "This is a test event.",
        "start_time": start,
        "end_time": end,
        "location": "Test Location",
        "image_url": "http://example.com/image.png"
    })

    print(response.status_code)
    data = response.get_json()
    print(data.get("message"))
    assert response.status_code == 400

    response = client.get(
        '/api/events/upcoming')
    
    data = response.get_json()
    print(data)

    response = client.get(
        '/api/events/1')
    
    data = response.get_json()
    print(data)
    print(data.get("event").get("id"))

    assert int(data.get("event").get("id")) == 1

    response = client.put(
        '/api/events/1/update',
        json={
        "event_name": "Test Event",
        "description": "This is a test event.",
        "start_time": start,
        "end_time": end,
        "location": "Test Location",
        "image_url": "http://example.com/image.png"
    })

    assert response.status_code == 400

    response = client.put(
        '/api/events/1/update',
        json={
        "event_name": "Test Event Diff"
    },
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    assert response.status_code == 200

    response = client.get(
        '/api/events/1')
    
    data = response.get_json()
    print(data)
    print(data.get("event").get("event_name"))

    assert data.get("event").get("event_name") == "Test Event Diff"

    response = client.delete(
        '/api/events/1/delete',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    assert response.status_code == 200

    response = client.delete(
        '/api/events/1/delete',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    assert response.status_code == 404

    response = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    data = response.get_json()
    print(data)

    response = client.post(
        '/api/events/create',
        json={
        "event_name": "Test Event",
        "description": "This is a test event.",
        "start_time": start,
        "end_time": end,
        "location": "Test Location",
        "image_url": "http://example.com/image.png"
    },
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    assert response.status_code == 201

    response = client.get(
        '/api/events/upcoming'
    )
    data = response.get_json()
    assert response.status_code == 200

    response = client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 201

    response = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 200

    response = client.delete(
        '/api/events/1/unregister',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 200

    response = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 404

    response = client.get(
        '/api/events/user_created_events',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 200