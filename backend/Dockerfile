FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    binutils libproj-dev gdal-bin \
    libgdal-dev libgeos-dev \
    postgresql-client netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Set env vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy root-level .env into the working dir
COPY .env .

EXPOSE 8000

# Run server (command overridden by docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
