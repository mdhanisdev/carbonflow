#!/bin/sh
set -e

# Run database migrations on container start (non-interactive)
echo "Running migrations..."
python manage.py migrate --noinput || true
echo "Migrations finished, starting server..."

exec gunicorn core.wsgi --bind 0.0.0.0:8080
