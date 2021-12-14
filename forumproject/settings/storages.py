import sys
from .base import env
from .base import INSTALLED_APPS
import environ

env = environ.Env(USE_S3=(bool, True))

INSTALLED_APPS += ("storages",)

if "test" not  in sys.argv and env('USE_S3'):
    # Access to S3
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")

    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFAULT_ACL = None 
    
    AWS_S3_REGION_NAME = "eu-central-1"
    AWS_S3_CUSTOM_DOMAIN = (
        f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com"
    )
    
    # Allow django-admin collectstatic to automatically put your static files in your bucket
    # Look in S3 for static files first. If not present it will look only locally
    STATICFILES_STORAGE = "storages.backends.s3boto3.S3StaticStorage"
    AWS_STATIC_LOCATION = "static"
    AWS_LOCATION = "static"
    # Upload media files to S3
    DEFAULT_FILE_STORAGE = "forumproject.custom_storages.MediaStorage"

    AWS_IS_GZIPPED = True
