"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os
import sys
import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from django.core.wsgi import get_wsgi_application

# Migrations are run as a separate release step (Procfile `release`).
# Avoid running migrations at import time to prevent AppRegistryNotReady errors
# when Gunicorn imports this module during worker startup.
application = get_wsgi_application()
