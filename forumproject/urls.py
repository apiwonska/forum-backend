from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from forum.api.views import CategoryViewSet, ThreadViewSet, PostViewSet
from users.api.views import (
    UserViewSet,
    RegistrationViewSet,
)


# Regiter REST FRAMEWORK routers
router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('threads', ThreadViewSet, basename='thread')
router.register('posts', PostViewSet, basename='post')
router.register('users', UserViewSet, basename='user')
router.register('registration', RegistrationViewSet, basename='registration')

# Serve Single Page Application
# No caching index.html because it can change any time
index = never_cache(TemplateView.as_view(template_name="index.html"))

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include('users.api.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
