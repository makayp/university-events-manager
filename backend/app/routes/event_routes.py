from flask import Blueprint, request, jsonify, render_template
from app import db
from datetime import timedelta, datetime, timezone
from app.models import User, BlacklistedToken, Event, EventRegister
from app.routes.auth_routes import jwt_required
import re, jwt, os
from math import ceil
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func

event_bp = Blueprint('events', __name__, url_prefix="/api/events")

DEFAULT_PER_PAGE = 10
MAX_PER_PAGE = 50

@event_bp.route('/upcoming', methods=['GET'])
def get_upcoming_events():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', DEFAULT_PER_PAGE, type=int)
    per_page = min(per_page, MAX_PER_PAGE)
    if page < 1 or per_page < 1:
        return jsonify({
            "success": False,
            "message": "per_page and page must be positive integers."
        }), 400
    
    current_time = datetime.now(timezone.utc)
    events_query = (
    Event.query
        .filter(Event.start_time > current_time)  # Use .filter() for complex conditions
        .order_by(Event.start_time.asc())
    )


    total_events = events_query.count()
    events = events_query.offset((page - 1) * per_page).limit(per_page).all()

    total_pages = ceil(total_events / per_page)



    upcoming_events = []

    for event in events:
        try:
            # Convert event start_time to timezone-aware datetime object
            start_time = datetime.fromisoformat(event.start_time)
            if start_time.tzinfo is None:
                start_time = start_time.replace(tzinfo=timezone.utc)
            start_time = start_time.isoformat()

            # Convert end_time to a timezone-aware datetime object, if applicable
            end_time = None
            if event.end_time:
                end_time = datetime.fromisoformat(event.end_time)
                if end_time.tzinfo is None:
                    end_time = end_time.replace(tzinfo=timezone.utc)
                end_time = end_time.isoformat()

        except ValueError as e:
            continue
        if event.user:
            user_info = {
                "user_id": event.user.id,
                "email": event.user.email,
                "first_name": event.user.first_name,
                "last_name": event.user.last_name,
                "image_url": event.user.image_url
            }
        else:
            user_info = None

        upcoming_events.append({
            "id": event.id,
            "user_info": user_info,
            "event_name": event.event_name,
            "description": event.description,
            "start_time": event.start_time,
            "end_time": event.end_time,
            "location": event.location,
            "image_url": event.image_url
        })

    response = {
        "events": upcoming_events,
        "pagination" : {
            "current_page" : page,
            "per_page" : per_page,
            "total_events" : total_events,
            "total_pages" : total_pages,
        }
    }

    return jsonify(response), 200

@event_bp.route('/create', methods=['POST'])
@jwt_required
def create_event(user):
    try:
        data = request.get_json()

        event_name = data.get("event_name")
        description = data.get("description")
        start_time = data.get("start_time")
        end_time = data.get("end_time")
        location = data.get("location")
        image_url = data.get("image_url")

        if not event_name or not start_time or not location:
            return jsonify({
                "success": False,
                "message": "Event name, start time, and location are required fields."
            }), 400

        try:
            new_event = Event(
                user_id=user.id,
                event_name=event_name,
                description=description,
                start_time=datetime.fromisoformat(start_time).isoformat(),
                end_time=datetime.fromisoformat(end_time).isoformat() if end_time else None,
                location=location,
                image_url=image_url if image_url else None
            )
        except ValueError as e:
            return jsonify({
                "success": False,
                "message": "Date not in ISO format."
            }), 400

        db.session.add(new_event)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Event created successfully.",
            "event": new_event.id
        }), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "An error occurred while creating the event."
        }), 500

@event_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Event.query.filter_by(id=event_id).first()

        if event is None:
            return jsonify({
                "success": False,
                "message": "Event not found."
            }), 404
        
        try:
            # Convert event start_time to timezone-aware datetime object
            start_time = datetime.fromisoformat(event.start_time)
            if start_time.tzinfo is None:
                start_time = start_time.replace(tzinfo=timezone.utc)
            start_time = start_time.isoformat()

            # Convert end_time to a timezone-aware datetime object, if applicable
            end_time = None
            if event.end_time:
                end_time = datetime.fromisoformat(event.end_time)
                if end_time.tzinfo is None:
                    end_time = end_time.replace(tzinfo=timezone.utc)
                end_time = end_time.isoformat()

        except ValueError as e:
            return jsonify({
                "success": False,
                "message": "The was a formatting error with the event."
            }), 400

        if event.user:
            user_info = {
                "user_id": event.user.id,
                "email": event.user.email,
                "first_name": event.user.first_name,
                "last_name": event.user.last_name,
                "image_url": event.user.image_url
            }
        else:
            user_info = None

        return jsonify({
            "success": True,
            "event": {
                "id": event.id,
                "user_info": user_info,
                "event_name": event.event_name,
                "description": event.description,
                "start_time": event.start_time,
                "end_time": event.end_time,
                "location": event.location,
                "image_url": event.image_url
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"An error occurred while retrieving the event: {str(e)}"
        }), 500
    
from datetime import datetime

@event_bp.route('/search', methods=["GET"])
def search_events():
    search_text = request.args.get("text")
    field = request.args.get("field") 
    filter_expired = request.args.get("expired", "false").lower() == "true"
    
    if not search_text:
        return jsonify({"success": False, "message": "Search text is required."}), 400
    
    if not field or field not in ['event_name', 'location', 'description']:
        return jsonify({"success": False, "message": "Valid field parameter is required (event_name, location, description)."}), 400
    
    field_column = getattr(Event, field)
    
    query = Event.query.filter(
        field_column.ilike(f"%{search_text}%") |  # Partial matching
        (func.soundex(field_column) == func.soundex(search_text))  # Phonetic matching
    )
    
    if not filter_expired:
        query = query.filter(Event.end_time > datetime.now(timezone.utc).isoformat())
    
    events = query.limit(DEFAULT_PER_PAGE).all()

    if not events:
        return jsonify({"success": True, "message": "No matching events found.", "events": []}), 200

    events_list = [
    {
        "id": event.id,
        "event_name": event.event_name,
        "description": event.description,
        "start_time": event.start_time,
        "end_time": event.end_time,
        "location": event.location,
        "created_at": event.created_at,
        "image_url": event.image_url,
        "user_info": {
            "user_id": event.user.id,
            "email": event.user.email,
            "first_name": event.user.first_name,
            "last_name": event.user.last_name,
            "image_url": event.user.image_url
        } if event.user else None  # Add user info if it exists, else empty dictionary
    } for event in events]
    
    return jsonify({"success": True, "message": "Events found.", "events": events_list}), 200

@event_bp.route('/<int:event_id>/update', methods=['PUT'])
@jwt_required
def update_event(user, event_id):
    data = request.get_json()
        
    event = Event.query.filter_by(id=event_id).first()
    if event is None:
        return jsonify({
            "success": False,
            "message": "Event not found."
        }), 404

    if event.user_id != user.id:
        return jsonify({
            "success": False,
            "message": "Unauthorized access."
        }), 401

    try:
        event.event_name = data.get("event_name", event.event_name)
        event.description = data.get("description", event.description)
        event.image_url = data.get("image_url", event.image_url)
        if "start_time" in data:
            try:
                event.start_time = datetime.fromisoformat(data["start_time"]).isoformat()
            except ValueError:
                return jsonify({
                    "success": False,
                    "message": "Start time must be in ISO format."
                }), 400
        if "end_time" in data:
            try:
                event.end_time = datetime.fromisoformat(data["end_time"]).isoformat()
            except ValueError:
                return jsonify({
                    "success": False,
                    "message": "End time must be in ISO format."
                }), 400
        event.location = data.get("location", event.location)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Event updated successfully."
        }), 200

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "An error occurred while updating the event."
        }), 500
    
@event_bp.route('/<int:event_id>/delete', methods=['DELETE'])
@jwt_required
def delete_event(user, event_id):
    event = Event.query.filter_by(id=event_id).first()

    if event is None:
        return jsonify({
            "success": False,
            "message": "Event not found."
        }), 404
    if event.user_id != user.id:
        return jsonify({
            "success": False,
            "message": "Unauthorized Aceess."
        }), 401
    try:
        db.session.delete(event)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Event deleted successfully."
        }), 200

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occurred while deleting the event: {str(e)}"
        }), 500

@event_bp.route('/<int:event_id>/register', methods=['POST'])
@jwt_required
def register_event(user, event_id):
    registration = EventRegister.query.filter_by(event_id=event_id, user_id=user.id).first()

    if registration:
        return jsonify({
            "success": False,
            "message": f"User: {user.id} is already registered for event {event_id}."
        }), 409
    
    new_registration = EventRegister(event_id=event_id, user_id=user.id)

    try:
        db.session.add(new_registration)
        db.session.commit()
        return jsonify({
            "success": True,
            "message": f"User successfully registered for event."
        }), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occured while registering."
        }), 500
    
@event_bp.route('/<int:event_id>/unregister', methods=['DELETE'])
@jwt_required
def unregister_event(user, event_id):
    registration = EventRegister.query.filter_by(event_id=event_id, user_id=user.id).first()

    if not registration:
        return jsonify({
            "success": False,
            "message": f"User: {user.id} is not registered for event {event_id}."
        }), 404
    
    try:
        db.session.delete(registration)
        db.session.commit()
        return jsonify({
            "success": True,
            "message": f"User: {user.id} is not registered for event {event_id}."
        }), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            "success": True,
            "message": f"An error occurered while unregistering."
        }), 500
    
@event_bp.route("/user_created_events", methods=['GET'])
@jwt_required
def get_user_created_events(user):
    try:
        events = Event.query.filter_by(user_id=user.id).all()

        if not events:
            return jsonify({
                "success": False,
                "message": "No events found for this user."
            }), 404

        event_list = []
        for event in events:
            event_details = {
                "id": event.id,
                "user_info": {
                    "user_id": event.user.id,
                    "email": event.user.email,
                    "first_name": event.user.first_name,
                    "last_name": event.user.last_name,
                    "image_url": event.user.image_url
                },
                "event_name": event.event_name,
                "description": event.description,
                "start_time": event.start_time,
                "end_time": event.end_time,
                "location": event.location,
                "image_url": event.image_url
            }
            event_list.append(event_details)

        return jsonify({
            "success": True,
            "message": "Events retrieved successfully.",
            "events": event_list
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@event_bp.route('/registered', methods=['GET'])
@jwt_required
def get_user_registered_events(user):
    registrations = EventRegister.query.filter_by(user_id=user.id).all()

    if not registrations:
        return jsonify({
            "success": False,
            "message": "No registrations found for this user."
        }), 404
    
    event_list = [
        {
            "id": reg.event.id,
            "user_info": {
                "user_id": reg.user.id,
                "email": reg.user.email,
                "first_name": reg.user.first_name,
                "last_name": reg.user.last_name,
                "image_url": reg.user.image_url
            },
            "event_name": reg.event.event_name,
            "description": reg.event.description,
            "start_time": reg.event.start_time,
            "end_time": reg.event.end_time,
            "location": reg.event.location,
            "image_url": reg.event.image_url
        } for reg in registrations
    ]
    
    return jsonify({
        "success": True,
        "message": "Registered events retrieved successfully.",
        "events": event_list
    }), 200