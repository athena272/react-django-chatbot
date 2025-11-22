from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Message.
    
    Utilizado para serializar e deserializar mensagens na API REST.
    """
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'response', 'created_at']
        read_only_fields = ['id', 'response', 'created_at']


class MessageCreateSerializer(serializers.Serializer):
    """
    Serializer para criação de mensagens.
    
    Recebe apenas user e content, pois a response será gerada no backend.
    """
    user = serializers.ChoiceField(choices=['A', 'B'])
    content = serializers.CharField()

