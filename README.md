# EventHub

This is a web application built for managing university events, designed with Next.js and Flask. It allows students and staff to view, create, and manage events within the university. The project is structured with a frontend built in Next.js and a backend built in Flask.

## Getting Started

To get the project up and running on your local machine, follow the steps below.

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 16.x)
- npm or yarn
- Python (>= 3.13)
- Cloudinary account (for image management)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/makayp/university-events-manager.git
   cd university-events-manager
   ```

2. Install frontend dependencies:

   If you're using npm:

   ```bash
   cd frontend
   npm install
   ```

   Or if you're using yarn:

   ```bash
   cd frontend
   yarn install
   ```

3. Set up the backend (Flask API):

   If you're working with the backend, follow these steps to set up the Flask API:

   - Make sure you are using Python 3.13 or higher.
   - Install the required Python dependencies from `requirements.txt`:

     ```bash
     cd backend
     pip install -r requirements.txt
     ```

4. Set up the environment variables for the Flask backend. You will need the following:

   - `JWT_SECRET`: Used to sign the JWT's.
   - `FLASK_ENV`: Used to specify which config to run Flask in.
     - `"testing"`: For testing with a memory-based database.
     - `"development"`: For debugging, with a separate database from production.
     - `"production"`: For production, with a secure separate database.

   To set the environment variables, use the following command:

   ```bash
   export VAR_NAME=value
   ```

   For example:

   ```bash
   export JWT_SECRET="your_jwt_secret"
   export FLASK_ENV="development"
   ```

   You can test the variable with:

   ```bash
   echo $MY_VAR
   ```

### Database Setup

To initialize or update the database, run the following commands based on the `FLASK_ENV`:

1. Run the database migration:

   ```bash
   flask db init
   ```

   ```bash
   flask db migrate -m "MESSAGE"
   ```

2. Upgrade the database:

   ```bash
   flask db upgrade
   ```

This will set up the database according to the selected `FLASK_ENV`.

### Running the Development Server

Once the dependencies are installed and environment variables are configured, you can run the development server:

1. Start the Flask backend:

   ```bash
   cd backend
   flask run
   ```

   Ensure that the `FLASK_ENV` is set to `"development"` for development mode.

2. Start the Next.js frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   Or with yarn:

   ```bash
   cd frontend
   yarn dev
   ```

Now you can access the application at `http://localhost:3000` in your browser.

## Deployment

### Frontend

To deploy the frontend on Vercel or another platform:

1. Make sure to configure your environment variables on the platform.
2. Push the code to your repository and connect it to the deployment platform (e.g., Vercel).
3. Deploy the frontend.

### Backend

For deploying the Flask backend, you can use platforms like Heroku, AWS, or DigitalOcean. Ensure that your server is configured to handle the endpoints and environment variables correctly.
