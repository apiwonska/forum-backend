import django_heroku
import environ

env = environ.Env(USE_HEROKU=(bool, True))

if env('USE_HEROKU'):
  # Activate Django-Heroku.
  django_heroku.settings(locals())
