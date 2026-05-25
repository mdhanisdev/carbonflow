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

# Run migrations before application startup so logs show the output
try:
	from django.core.management import call_command
	call_command('migrate', verbosity=1, interactive=False)
	print('Auto-migrate completed')
	sys.stdout.flush()
except Exception:
	logging.exception('Auto-migrate failed on startup')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
