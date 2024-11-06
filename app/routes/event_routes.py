from flask import Blueprint, request, jsonify, render_template
from app import db
from datetime import timedelta, datetime, timezone
from app.models import User, BlacklistedToken, Event
from app.routes.auth_routes import jwt_required
import re, jwt, os
from sqlalchemy.orm import joinedload
from math import ceil
from zoneinfo import ZoneInfo

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

    # Filter events by start_time > current time directly in the query
    current_time = datetime.now(timezone.utc)
    events_query = (
        db.session.query(Event)
        .filter(Event.start_time > current_time)
        .order_by(Event.start_time.desc())
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

            # Convert end_time to a timezone-aware datetime object, if applicable
            end_time = None
            if event.end_time:
                end_time = datetime.fromisoformat(event.end_time)
                if end_time.tzinfo is None:
                    end_time = end_time.replace(tzinfo=timezone.utc)

        except ValueError as e:
            # Skip events with invalid date formats
            continue

        upcoming_events.append({
            "id": event.id,
            "user_info": {
                "email": event.user.email,
                "first_name": event.user.first_name,
                "last_name": event.user.last_name,
            },
            "event_name": event.event_name,
            "description": event.description,
            "start_time": start_time,
            "end_time": end_time,
            "location": event.location
        })

    response = {
        "events": upcoming_events,
        "pagination": {
            "current_page": page,
            "per_page": per_page,
            "total_events": total_events,
            "total_pages": total_pages,
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
        
        # Validate the data
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
                start_time=datetime.fromisoformat(start_time),
                end_time=datetime.fromisoformat(end_time) if end_time else None,
                location=location,
                created_at=datetime.now(timezone.utc)
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

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occurred while creating the event: {str(e)}"
        }), 500

@event_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = db.session.query(Event).get(event_id)

        if event is None:
            return jsonify({
                "success": False,
                "message": "Event not found."
            }), 404

        start_time = event.start_time.isoformat() if event.start_time else None
        end_time = event.end_time.isoformat() if event.end_time else None

        event_data = {
            "id": event.id,
            "user_info": {
                "email": event.user.email,
                "first_name": event.user.first_name,
                "last_name": event.user.last_name,
            },
            "event_name": event.event_name,
            "description": event.description,
            "start_time": start_time,
            "end_time": end_time,
            "location": event.location,
            "created_at": event.created_at.isoformat()
        }

        return jsonify({
            "success": True,
            "event": event_data
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"An error occurred while retrieving the event: {str(e)}"
        }), 500
    
@event_bp.route('/<int:event_id>/update', methods=['PUT'])
@jwt_required
def update_event(user, event_id):
    try:
        data = request.get_json()
        
        event = db.session.query(Event).get(event_id)
        if event is None:
            return jsonify({
                "success": False,
                "message": "Event not found."
            }), 404

        try:
            event.event_name = data.get("event_name", event.event_name)
            event.description = data.get("description", event.description)
            event.start_time = datetime.fromisoformat(data.get("start_time", event.start_time.isoformat()))
            event.end_time = datetime.fromisoformat(data.get("end_time", event.end_time.isoformat())) if data.get("end_time") else event.end_time
            event.location = data.get("location", event.location)
        except ValueError as e:
            return jsonify({
                "success": False,
                "message": "Date not in ISO format."
            }), 400
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Event updated successfully."
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occurred while updating the event: {str(e)}"
        }), 500
    
@event_bp.route('/<int:event_id>/delete', methods=['DELETE'])
@jwt_required
def delete_event(user, event_id):
    try:
        event = db.session.query(Event).get(event_id)

        if event is None:
            return jsonify({
                "success": False,
                "message": "Event not found."
            }), 404

        db.session.delete(event)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Event deleted successfully."
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occurred while deleting the event: {str(e)}"
        }), 500
