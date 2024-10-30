from flask import Blueprint, render_template, jsonify, redirect, url_for, request
from app.routes.auth_routes import jwt_required

main_bp = Blueprint("main", __name__)

# Main Pages

@main_bp.route('/')
def home():
    return render_template("index.html")

@main_bp.route('/login')
def login():
    return render_template("login.html")

@main_bp.route('/signup')
def signup():
    return render_template("signup.html")

# User Dashboard

@main_bp.route('/dashboard')
@jwt_required
def dashboard(user):
    return render_template("dashboard.html")

@main_bp.route('/dashboard/my-events')
@jwt_required
def my_events(user):
    return render_template("index.html")

@main_bp.route('/dashboard/profile')
@jwt_required
def profile(user):
    return render_template("index.html")

# Events

# List of events
@main_bp.route('/events')
def event_list():
    return render_template("index.html")

# Event creation
@main_bp.route('/events/create', methods=['GET', 'POST'])
@jwt_required
def create_event(user):
    return render_template("index.html")

# Event details
@main_bp.route('/events/<int:event_id>')
def event_detail(event_id):
    return render_template("index.html")

# Event editing
@main_bp.route('/events/<int:event_id>/edit', methods=['GET', 'POST'])
@jwt_required
def edit_event(event_id, user):
    return render_template("index.html")

# Admin TODO