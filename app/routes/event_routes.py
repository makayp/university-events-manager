from flask import Blueprint, request, jsonify
from app import db
from datetime import timedelta, datetime, timezone
from app.models import User, BlacklistedToken, Event
import re, jwt, os

event_bp = Blueprint('events', __name__, url_prefix="/events")

@event_bp.route('/upcoming', methods=['GET'])
def get_upcoming_events():
    # Pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    today = datetime.now(timezone.utc).date()

    upcoming_events = Event.query.filter(Event.event_date >= today).order_by(Event.event_date.asc()).paginate(page, per_page, error_out=False)

    events_list = []
    for event in upcoming_events.items:
        events_list.append({
            'id': event.id,
            'event_name': event.event_name,
            'description': event.description,
            'event_date': event.event_date.isoformat(),
            'start_time': event.start_time.isoformat(),
            'end_time': event.end_time.isoformat() if event.end_time else None,
            'location': event.location
        })

    return jsonify({
        'success': True,
        'events': events_list,
        'total': upcoming_events.total,
        'page': upcoming_events.page,
        'pages': upcoming_events.pages
    }), 200