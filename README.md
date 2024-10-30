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