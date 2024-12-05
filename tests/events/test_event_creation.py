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
    print("ogogog")
    print(data)

    response = client.get(
        '/api/events/1')
    
    data = response.get_json()
    print(data)

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
        "event_name": "Test Event1",
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

    response = client.post(
        '/api/events/create',
        json={
        "event_name": "Test Event2",
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

    response = client.post(
        '/api/events/create',
        json={
        "event_name": "Test Event3",
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

    response = client.post(
        '/api/events/2/register',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print(response.get_json())

    assert response.status_code == 201

    print("GEEE")
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

    print("REGISTERED")
    print(response.get_json())

    assert response.status_code == 200

    response = client.get(
        '/api/events/user_created_events',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )

    print("CREATED")
    print(response.get_json())

    assert response.status_code == 200

    response = client.get(
        '/api/events/2')
    
    print(response.get_json())

def test_single_event(client):
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

    c1 = client.post('/api/auth/register', 
        json={
            "email": "User1@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })
    c2 = client.post('/api/auth/register', 
        json={
            "email": "User2@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })
    c3 = client.post('/api/auth/register', 
        json={
            "email": "User3@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })
    
    client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c2.get_json()["token"]}'
        }
    )
    client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c3.get_json()["token"]}'
        }
    )

    response = client.get('/api/events/1')

    print(response.get_json())

def test_deletion(client):
    print("\nStarting Deletion")
    print("Registering Users")
    c1 = client.post('/api/auth/register', 
        json={
            "email": "User1@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })
    c2 = client.post('/api/auth/register', 
        json={
            "email": "User2@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })
    c3 = client.post('/api/auth/register', 
        json={
            "email": "User3@mail.com",
            "password": "1a!B1234",
            "firstName": "John",
            "lastName": "Smith",
            "image_url": "http://..."
        })

    start = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()
    end = (datetime.now(timezone.utc) + timedelta(days=2)).isoformat()

    print("Making Event")
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
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )

    print("Registering users for event")
    out = client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()["message"])
    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()['events'])

    out = client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c2.get_json()["token"]}'
        }
    )
    print(out.get_json()["message"])
    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()["events"])

    out = client.post(
        '/api/events/1/register',
        headers={
            'Authorization': f'Bearer {c3.get_json()["token"]}'
        }
    )
    print(out.get_json()["message"])
    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()["events"])

    response = client.delete(
        '/api/events/1/delete',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )

    print(response.get_json())

    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()['events'])

    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()["events"])

    out = client.get(
        '/api/events/registered',
        headers={
            'Authorization': f'Bearer {c1.get_json()["token"]}'
        }
    )
    print(out.get_json()["events"])