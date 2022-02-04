from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from administration.serializers import UserSerializer, UserPasswordSerializer, UserCreateSerializer

User = get_user_model()


class UserViewset(ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        else:
            return UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.POST)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create(
            email=serializer.validated_data['email'],
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name']
        )

        user.set_password(serializer.validated_data['password'])
        user.save()

        data = UserSerializer(user).data
        return Response(data)

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserPasswordSerializer(data=request.POST)
        serializer.is_valid(raise_exception=True)
        user.set_password(serializer.validated_data['password'])
        user.save()
        return Response({'status': 'password set'})

