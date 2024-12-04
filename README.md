# university-events-manager

Using python 3.13
install the requirements from the requirements.txt file

Environment Variables
JWT_SECRET: Used to sign the JWT's
FLASK_ENV: User to tell which config to run flask in
    -"testing": Used for testing with a memory based db.

    -"development": Sets up a debugging server and db seperate from production, lets you edit and see data.

    -"production": Seperate db, for production used, secure.

Use export VAR_NAME=value
Example: MY_VAR="Hello World"
Test with: echo $MY_VAR

Database
to initialize the database, or update. Use the 
```flask db migrate -m "MESSAGE"```
then run
```flask db upgrade```
this should set up the db based on the FLASK_ENV.

To run the app in a developement environemnt set the FLASK_ENV="development" then use
```flask run```
Make sure that the JWT_SECRET is set for production.

# API Routes Reference

## Authentication Routes

### `POST /api/auth/register`
#### Request Body:
- `email`: string (required)
- `password`: string (required)
- `firstName`: string (required)
- `lastName`: string (required)
- `image_url`: string (optional)

#### Response:
- `token`: JWT token (on success)
- `message`: Registration message

---

### `POST /api/auth/login`
#### Request Body:
- `email`: string (required)
- `password`: string (required)

#### Response:
- `token`: JWT token (on success)
- `message`: Login message

---

### `POST /api/auth/logout`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Response:
- `message`: Logout message

---

### `DELETE /api/auth/delete_account`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Response:
- `message`: Account deletion message

---

### `PUT /api/auth/update_user_info`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Request Body:
- `first_name`: string (optional)
- `last_name`: string (optional)
- `image_url`: string (optional)

#### Response:
- `message`: User info update message

---

### `PUT /api/auth/change_password`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Request Body:
- `email`: string (required)
- `password`: string (required)
- `new_password`: string (required)

#### Response:
- `message`: Password change message

---

## Event Routes

### `GET /api/events/upcoming`
#### Query Parameters:
- `page`: integer (optional, default: 1)
- `per_page`: integer (optional, default: 10)

#### Response:
- List of upcoming events
- Pagination information (`current_page`, `per_page`, `total_events`, `total_pages`)

---

### `POST /api/events/create`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Request Body:
- `event_name`: string (required)
- `description`: string (optional)
- `start_time`: ISO 8601 datetime string (required)
- `end_time`: ISO 8601 datetime string (optional)
- `location`: string (required)
- `image_url`: string (optional)

#### Response:
- `event`: Event ID (on success)
- `message`: Event creation message

---

### `GET /api/events/<event_id>`
#### Path Parameters:
- `event_id`: integer (required)

#### Response:
- Event details (ID, name, description, start/end time, location, user info, etc.)

---

### `GET /api/events/search`
#### Query Parameters:
- `text`: string (optional)
- `field`: string (optional, options: `event_name`, `location`, `description`)
- `expired`: string (optional, default: `false`)

#### Response:
- List of events matching the search criteria

---

### `PUT /api/events/<event_id>/update`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Path Parameters:
- `event_id`: integer (required)

#### Request Body:
- `event_name`: string (optional)
- `description`: string (optional)
- `start_time`: ISO 8601 datetime string (optional)
- `end_time`: ISO 8601 datetime string (optional)
- `location`: string (optional)
- `image_url`: string (optional)

#### Response:
- `message`: Event update message

---

### `DELETE /api/events/<event_id>/delete`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Path Parameters:
- `event_id`: integer (required)

#### Response:
- `message`: Event deletion message

---

### `POST /api/events/<event_id>/register`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Path Parameters:
- `event_id`: integer (required)

#### Response:
- `message`: Registration success or failure message

---

### `DELETE /api/events/<event_id>/unregister`
#### Headers:
- `Authorization`: `Bearer <token>` (required)

#### Path Parameters:
- `event_id`: integer (required)

#### Response:
- `message`: Unregistration success or failure message
