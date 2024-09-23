## Set up Postgres Database with PostGIS

### Install PostgreSQL and PostGIS

Before running your Django API, you'll need to set up a PostgreSQL database with the PostGIS extension, which is essential for handling geospatial data in Django.

For Ubuntu/Debian-based systems:
Install PostgreSQL and PostGIS:
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib postgis

Start the PostgreSQL service:
sudo service postgresql start

For MacOS (using Homebrew):
Install PostgreSQL and PostGIS:
brew install postgresql
brew install postgis

Start the PostgreSQL service:
brew services start postgresql

### Create a New PostgreSQL Database and User

Once PostgreSQL is installed, follow these steps to create a new database and user:

Log in to the PostgreSQL prompt:
sudo -u postgres psql

Create a new database:
CREATE DATABASE manzil_db;

Create a new user and set a password:
CREATE USER core_user WITH PASSWORD 'your_password';

Grant all privileges to the user on the new database:
GRANT ALL PRIVILEGES ON DATABASE manzil_db TO core_user;

### Enable PostGIS Extension

While still logged into the PostgreSQL prompt, connect to your database and enable the PostGIS extension:
\c manzil_db;
CREATE EXTENSION postgis;

This adds the necessary geospatial capabilities to your PostgreSQL database.

## Set up a virtual environment

python -m venv env
source env/bin/activate # For Linux/macOS
env\Scripts\activate # For Windows

## Install dependencies:

pip install -r requirements.txt

## Set up environment variables:

You will need to create a .env file (by looking at .env.sample) or set the required environment variables manually.

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
TWILIO_VERIFY_SERVICE_SID=

## Configure the database:

If you're using a database like SQLite, no additional configuration is needed. Otherwise, update the DATABASES settings in settings.py with your database credentials.

Run migrations to set up the database:
python manage.py migrate

## Run the development server:

python manage.py runserver

## Accessing from an Android Emulator:

By default, the Android emulator uses 10.0.2.2 to connect to the host machine. This IP has already been added to ALLOWED_HOSTS in your settings.py
ALLOWED_HOSTS = ['127.0.0.1', '10.0.2.2']

When the server is running, you can access the Django app in your Android emulator using:

## Troubleshooting:

Server not reachable from emulator: Make sure the correct IP (10.0.2.2 for Android, 127.0.0.1/localhost for iOS) is included in your ALLOWED_HOSTS.
Database errors: Double-check your database configuration and ensure the database service is running.
Port issues: If :8000 is occupied, specify a different port using:
python manage.py runserver <port-number>

## Additional Notes:

For deployment or production settings, remember to update ALLOWED_HOSTS, configure SSL, and disable DEBUG mode.
Refer to Django’s official documentation for more advanced settings.
