from rest_framework import filters, generics, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.models import CustomUser

from .permissions import IsOwnerOrReadOnly
from .serializers import (ChangePasswordSerializer, RegistrationSerializer,
                          UserPrivateSerializer, UserPublicSerializer)


class UserViewSet(viewsets.ModelViewSet):
    """Allowed http methods: get, patch, put, head, options.
    Some user data are accessible only for profile owner and hidden from other users.
    User can update only their own profile data.

    Routes:
    GET /users/
    GET /users/?search=some_name
    GET /users/1/
    PATCH/PUT /users/1/

    Ordering is alphabetical. 
    """
    queryset = CustomUser.objects.exclude(username='user_deleted')
    serializer_class = UserPublicSerializer
    http_method_names = ['get', 'patch', 'put', 'head', 'options']
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        """Custom retrieve method use UserPrivateSerializer if the user object is requested by it's owner.
        """
        super().retrieve(request, *args, **kwargs)
        instance = self.get_object()
        if request.user == instance:
            serializer = UserPrivateSerializer(instance, context={'request': request})
        else:
            serializer = UserPublicSerializer(instance, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """Custom update method allows to modify only selected fields.
        User is allowed to modify only their own profile. 
        UserPrivateSerializer is used instead of default serializer.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if request.user == instance:
            data ={}
            data['status'] = request.data.get('status', instance.status)
            data['description'] = request.data.get('description', instance.description)
            data['email'] = request.data.get('email', instance.email)
            if request.data.get('avatar'):
                data['avatar'] = request.data.get('avatar')

            serializer = UserPrivateSerializer(instance, data=data, partial=True, context={'request': request})
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}
            return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)

class RegistrationViewSet(viewsets.ModelViewSet):
    """Allowed http methods: post. For registering a user, the data have to contain `username`, `email`, `password` and `password2` fields.

    Routes:
    POST /registration/
    """
    serializer_class = RegistrationSerializer
    http_method_names = ['post']
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """Creates a new user. 
        Returns token, user id and username in the response.
        Response sets the authentication cookie.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)        
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        user_data = {'id': user.id, 'username': user.username}
        token, created = Token.objects.get_or_create(user=user)
        data = {'token': token.key, 'user': user_data}
        response = Response(data , status=status.HTTP_201_CREATED, headers=headers)
        response.set_cookie('Authorization', token.key)
        return response


class ChangePasswordView(generics.UpdateAPIView):
    """An endpoint for changing password.
    Data has to contain `old_password`, `password`, `password2`.
    After changing the password new authentication token is created and send in response.

    Routes:
    PUT/PATCH /change-password/
    """
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # Auth token is changed when password is changed (handled by signals)
        token, created = Token.objects.get_or_create(user=instance)
        return Response({ 'token': token.key, 'message': 'Your password was changed.'}, status=status.HTTP_200_OK)


class CustomObtainAuthToken(ObtainAuthToken):
    """Add user id and username to the response.
    Response sets the authentication cookie.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_data = {'id': user.id, 'username': user.username}
        token, created = Token.objects.get_or_create(user=user)
        response = Response({'token': token.key, 'user': user_data})
        response.set_cookie('Authorization', token.key)
        return response
