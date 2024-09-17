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
