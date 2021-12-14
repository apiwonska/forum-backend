import os
import sys
import environ
from .base import DEBUG, BASE_DIR

env = environ.Env(
    # set casting, default value
    EMAIL_USE_TLS=(bool, False),
)

if DEBUG or "test" in sys.argv:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = os.path.join(BASE_DIR, "sent_emails")
else:
    EMAIL_BACKEND = env('EMAIL_BACKEND')
    EMAIL_HOST_USER = env('EMAIL_HOST_USER')
    EMAIL_HOST = env('EMAIL_HOST')
    EMAIL_PORT = env('EMAIL_PORT')
    EMAIL_USE_TLS = env('EMAIL_USE_TLS')
    EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')

