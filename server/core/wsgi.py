"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from django.core.management import call_command
import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()

# Run migrations on startup (helps ensure DB tables exist in ephemeral deploys)
try:
	call_command('migrate', interactive=False)
except Exception as e:
	logging.exception('Auto-migrate failed on startup: %s', e)
