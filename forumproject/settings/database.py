import os
import sys
import dj_database_url
import environ
from .base import BASE_DIR

# To use these settings in developement mode to run tests
# you have to disable django_heroku.settings(locals()) 

env = environ.Env()
# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# For Heroku Postgres Database creadentials are changed automatically and periodically,
# you may need to check if they are up to date
# In case these settings don't work, this may be caused by 
# django_heroku.settings(locals()) that overwrites the settings.

DATABASES={}

if "test" in sys.argv or "test_coverage" in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'mydatabase'
        }
    }
    # This should work also for test with Heroku Database
    # DATABASES['default'] = dj_database_url.parse(env('TEST_DATABASE_URL'))
    # DATABASES['default']['TEST']={'NAME': env('TEST_DATABASE_NAME')}
else:
    # This setting reset DATABASES and use 'DATABASE_URL' by default
    DATABASES['default'] = dj_database_url.config(conn_max_age=0)
