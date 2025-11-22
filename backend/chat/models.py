from django.db import models


class Message(models.Model):
    """
    Modelo para armazenar mensagens dos usuários e respostas do chatbot.
    
    Campos:
    - user: Identificador do usuário ("A" ou "B")
    - content: Mensagem enviada pelo usuário
    - response: Resposta mockada do atendimento
    - created_at: Data e hora de criação do registro
    """
    USER_CHOICES = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]
    
    user = models.CharField(
        max_length=1,
        choices=USER_CHOICES,
        verbose_name='Usuário'
    )
    content = models.TextField(
        verbose_name='Mensagem do Usuário'
    )
    response = models.TextField(
        verbose_name='Resposta do Atendimento'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Data de Criação'
    )
    
    class Meta:
        verbose_name = 'Mensagem'
        verbose_name_plural = 'Mensagens'
        ordering = ['created_at']
    
    def __str__(self):
        return f"Mensagem do Usuário {self.user} - {self.created_at.strftime('%d/%m/%Y %H:%M')}"

