from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer, MessageCreateSerializer


def generate_mock_response(user: str) -> str:
    """
    Gera uma resposta mockada diferenciada por usuário.
    
    Args:
        user: Identificador do usuário ("A" ou "B")
    
    Returns:
        str: Resposta mockada personalizada
    """
    responses = {
        'A': "Obrigado pelo seu contato, Usuário A. Em breve responderemos.",
        'B': "Obrigado pelo seu contato, Usuário B. Nossa equipe falará com você em breve.",
    }
    return responses.get(user, "Obrigado pelo seu contato. Em breve responderemos.")


class MessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar mensagens.
    
    Endpoints:
    - POST /api/messages/ : Cria uma nova mensagem e retorna com resposta mockada
    - GET /api/messages/?user=A : Lista mensagens filtradas por usuário
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Cria uma nova mensagem.
        
        Recebe:
        {
            "user": "A" ou "B",
            "content": "texto da mensagem"
        }
        
        Retorna a mensagem criada com a resposta mockada.
        """
        serializer = MessageCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            content = serializer.validated_data['content']
            
            # Gera resposta mockada baseada no usuário
            response = generate_mock_response(user)
            
            # Cria o registro no banco
            message = Message.objects.create(
                user=user,
                content=content,
                response=response
            )
            
            # Retorna usando o serializer completo
            output_serializer = MessageSerializer(message)
            return Response(output_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        """
        Lista mensagens com filtro opcional por usuário.
        
        Query params:
        - user: "A" ou "B" (opcional)
        
        Retorna apenas as mensagens do usuário especificado.
        Ordenado do mais antigo para o mais recente.
        """
        queryset = self.get_queryset()
        
        # Filtra por usuário se o parâmetro for fornecido
        user_filter = request.query_params.get('user', None)
        if user_filter:
            if user_filter not in ['A', 'B']:
                return Response(
                    {"error": "O parâmetro 'user' deve ser 'A' ou 'B'"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            queryset = queryset.filter(user=user_filter)
        
        # Ordena do mais antigo para o mais recente
        queryset = queryset.order_by('created_at')
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

