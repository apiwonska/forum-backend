from rest_framework import serializers

from forum.models import Category, Thread, Post
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']
        extra_kwargs = {'username': {'read_only': True}, 'avatar': {'read_only': True}}


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'threads', 'posts']


class ThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = ['id', 'title', 'subject', 'user', 'category', 'sticky', 'closed', 'posts', 'latest_post_time', 'created', 'updated']

    # Used instead of nested serializer because user has to be read only. Same for PostSerializer.
    def to_representation(self, instance):
        """
        Object instance -> Dict of primitive datatypes.
        User field is represented with serialized user object.
        """
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data
        return representation


class ThreadShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = ['id', 'title', 'category']
        extra_kwargs = {
            'title': {'read_only': True}
        }


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'content', 'user', 'thread', 'created', 'updated']

    def to_representation(self, instance):
        """
        Object instance -> Dict of primitive datatypes.
        User field is represented with serialized user object.
        """
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data
        representation['thread'] = ThreadShortSerializer(instance.thread).data
        return representation