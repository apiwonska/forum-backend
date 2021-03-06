# Forum App: Back-end

[Forum App Live Demo](https://forum-ap.netlify.app/)  
[REST API Documentation Swagger UI](https://forum-backend-ap.herokuapp.com/api/schema/swagger-ui/)  
[REST API Documentation Redoc](https://forum-backend-ap.herokuapp.com/api/schema/redoc/)

[Github: front-end](https://github.com/apiwonska/forum-frontend)  
[Github: back-end](https://github.com/apiwonska/forum-backend)

A forum app that requires authorization.

You can use the following credentials or register using a fake email address. Email is used only in case of restoring a password.  
user: guest  
password: 2VggV22v

## Main features:
- Create, read, update, delete posts
- User registration and authentication
- Password recovery
- Django admin panel
- User profiles
- REST API documentation
  
## How it works:
- Access to the forum is restricted to authenticated users
- Only admin can add, delete or update categories
- Only the admin can delete threads
- User can start a new thread, but he can't delete or update it
- User can add posts
- User can update and delete his posts
- User can view a list of his posts
- User has a public profile with an option to change description, avatar or password

## Used technologies and packages (back-end):
- Django
- Django REST Framework
- PostgreSQL
- Endpoints tested with Postman
- Django's unit tests 
- Deployed with Heroku and AWS S3 for static files  
- django-environ
- Token Authentication
- drf-spectacular for swagger documentation generation

## REST API Routes
- GET /categories
- GET /categories/1
- GET /threads
- GET /threads/?category=1
- GET /threads/?search=xyz
- GET /threads/?ordering=created
- GET /threads/1
- POST /threads
- PUT/PATCH /threads/1
- GET /posts
- GET /posts/?user=1
- GET /posts/?thread=1
- GET /posts/?search=xyz
- GET /posts/?ordering=created
- GET /posts/1
- POST /posts
- PUT/PATCH /posts/1
- DELETE /posts/1
- GET /users/
- GET /users/?search=some_name
- GET /users/1/
- PATCH/PUT /users/1/
- POST /registration/
- POST /token-auth/
- PUT/PATCH /change-password/

## How to run on your machine
Prerequisites: you need to have installed Python 3, pip, pipenv, git on your computer.
  
- Clone repository  
  
  `$ git clone https://github.com/apiwonska/forum-backend`
- Install requirements from requirements.txt file 
   
  `$ pipenv install -r requirements.txt`
- Create .env file in the main directory next to manage.py file
- Add environmental variables:  
  
  Minimum required:
  ```
  DEBUG=True
  SECRET_KEY=your_secret_key
  USE_HEROKU=False
  USE_S3=False
  ```
  Other variables:
  ```
  DATABASE_URL
  ALLOWED_HOSTS
  EMAIL_BACKEND
  EMAIL_HOST_USER
  EMAIL_HOST
  EMAIL_PORT
  EMAIL_USE_TLS
  EMAIL_HOST_PASSWORD
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_STORAGE_BUCKET_NAME
  CORS_ORIGIN_WHITELIST
  ```
- Make migrations:  
  
  `python manage.py migrate`
- Create superuser:  
  
  `python manage.py createsuperuser`
- Run developement server:  
  
  `python manage.py runserver`

## Things to do:
- Customize drf-spectacular API documentation for `api/posts/` and `api/threads/`
- Correct formatting to conform to PIP 8 style guide