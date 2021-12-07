# Forum App

[Live demo](https://forum-ap.netlify.app/)  
[Github: front-end](https://github.com/apiwonska/forum-frontend)  
[Github: back-end](https://github.com/apiwonska/forum-backend)

A forum app that requires authorization.

You can use the following credentials or register using a fake email address.  
user: quest  
password: 2VggV22v

## Main features:
- Create, read, update, delete posts
- User registration and authentication
- Password recovery
- Django admin panel
- User profiles
  
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

## Routes
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