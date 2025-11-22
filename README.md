# Chatbot de Atendimento Simulado

Protótipo fullstack (Backend Django + Frontend React) de um sistema de chat simulado com login mockado, tela de chat e histórico de mensagens.

## 📋 Descrição do Projeto

Este projeto implementa um sistema de chat onde usuários podem enviar mensagens e receber respostas automáticas mockadas. O sistema suporta dois usuários diferentes (Usuário A e Usuário B), cada um com seu próprio histórico de mensagens.

### Funcionalidades

- **Login Mockado**: Seleção entre Usuário A e Usuário B sem autenticação real
- **Tela de Chat**: Interface para envio de mensagens e visualização de respostas automáticas
- **Tela de Histórico**: Visualização do histórico de mensagens filtrado por usuário
- **API REST**: Backend Django com Django REST Framework para gerenciamento de mensagens

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3+**
- **Django 4.2.7**
- **Django REST Framework 3.14.0**
- **django-cors-headers 4.3.1**
- **SQLite** (banco de dados padrão do Django)

### Frontend
- **React 18.2.0**
- **TypeScript 5.2.2**
- **Vite 5.0.8**
- **React Router DOM 6.20.1**
- **Axios 1.6.2**

## 📦 Estrutura do Projeto

```
react-django-chatbot/
├── backend/                    # Projeto Django
│   ├── chatbot_backend/       # Configurações do projeto
│   │   ├── settings.py        # Configurações (CORS, DRF, etc.)
│   │   ├── urls.py            # URLs principais
│   │   └── ...
│   ├── chat/                  # App de chat
│   │   ├── models.py          # Modelo Message
│   │   ├── serializers.py     # Serializers do DRF
│   │   ├── views.py           # ViewSets e lógica de negócio
│   │   ├── urls.py            # URLs da API
│   │   └── ...
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3             # Banco de dados (gerado após migrate)
│
├── frontend/                   # Projeto React
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── Layout.tsx     # Layout principal
│   │   │   └── LoginMockado.tsx
│   │   ├── pages/             # Páginas/rotas
│   │   │   ├── Chat.tsx       # Tela de chat
│   │   │   └── Historico.tsx  # Tela de histórico
│   │   ├── contexts/          # Context API
│   │   │   └── UserContext.tsx # Estado do usuário ativo
│   │   ├── services/          # Serviços de API
│   │   │   └── api.ts         # Configuração Axios
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Python 3.8+ instalado
- Node.js 16+ e npm (ou yarn) instalados
- Git (para clonar o repositório)

### Backend (Django)

1. **Navegue até a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Crie e ative um ambiente virtual:**

   **Linux/macOS:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   **Windows:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Crie as migrations (arquivos de migração do banco de dados):**
   ```bash
   python manage.py makemigrations
   ```
   
   Este comando cria os arquivos de migração baseados nos modelos definidos no código. Você deve ver uma mensagem como:
   ```
   Migrations for 'chat':
     chat/migrations/0001_initial.py
       - Create model Message
   ```

5. **Execute as migrations (aplica as migrações e cria as tabelas no banco):**
   ```bash
   python manage.py migrate
   ```
   
   Este comando aplica as migrações e cria as tabelas no banco de dados SQLite. Você deve ver mensagens como:
   ```
   Operations to perform:
     Apply all migrations: admin, auth, contenttypes, chat, sessions
   Running migrations:
     Applying chat.0001_initial... OK
   ```

6. **Inicie o servidor de desenvolvimento:**
   ```bash
   python manage.py runserver
   ```

   O backend estará rodando em: **http://localhost:8000**

   A API estará disponível em: **http://localhost:8000/api/**

7. **(Opcional) Criar superusuário para acessar o Django Admin:**
   
   O Django Admin é uma interface web para gerenciar os dados do banco de dados. Para acessá-lo, você precisa criar um superusuário:
   
   ```bash
   python manage.py createsuperuser
   ```
   
   O comando pedirá:
   - **Username**: Escolha um nome de usuário (ex: `admin`)
   - **Email address**: Pode ser deixado em branco ou informar um email
   - **Password**: Escolha uma senha forte (não aparece enquanto digita)
   - **Password (again)**: Confirme a senha
   
   Após criar o superusuário, acesse: **http://localhost:8000/admin/**
   
   No Django Admin você poderá:
   - Ver todas as mensagens enviadas pelos usuários A e B
   - Filtrar mensagens por usuário ou data de criação
   - Buscar mensagens pelo conteúdo
   - Ver detalhes completos de cada mensagem (id, usuário, conteúdo, resposta, data)
   
   **Nota**: O superusuário do Django Admin é diferente do login mockado do frontend (Usuário A/B). Ele serve apenas para administrar os dados através da interface web.

### Frontend (React)

1. **Abra um novo terminal e navegue até a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

   O frontend estará rodando em: **http://localhost:5173**

### Acessando a Aplicação

1. Certifique-se de que o **backend** está rodando (porta 8000)
2. Certifique-se de que o **frontend** está rodando (porta 5173)
3. Abra seu navegador e acesse: **http://localhost:5173**

## 🧪 Testando a API

Você pode testar a API diretamente usando curl ou ferramentas como Postman:

### Criar uma mensagem (POST)
```bash
curl -X POST http://localhost:8000/api/messages/ \
  -H "Content-Type: application/json" \
  -d '{"user": "A", "content": "Olá, preciso de ajuda!"}'
```

### Listar mensagens de um usuário (GET)
```bash
curl http://localhost:8000/api/messages/?user=A
```

### Listar todas as mensagens (GET)
```bash
curl http://localhost:8000/api/messages/
```

## 📚 Explicação Técnica

### Modelagem de Dados (Django)

O modelo `Message` foi estruturado da seguinte forma:

```python
class Message(models.Model):
    user = models.CharField(max_length=1, choices=[('A', 'Usuário A'), ('B', 'Usuário B')])
    content = models.TextField()  # Mensagem do usuário
    response = models.TextField()  # Resposta mockada
    created_at = models.DateTimeField(auto_now_add=True)
```

**Decisões técnicas:**
- `user` como CharField com choices para garantir apenas valores "A" ou "B"
- `content` e `response` como TextField para suportar mensagens longas
- `created_at` com `auto_now_add=True` para registrar automaticamente a data de criação
- Ordenação padrão por `created_at` (mais antigo primeiro)

### Filtragem por Usuário no Histórico

A filtragem é implementada na view `MessageViewSet.list()`:

1. **Endpoint**: `GET /api/messages/?user=A` ou `?user=B`
2. **Lógica**: 
   - A view verifica o parâmetro `user` na query string
   - Se fornecido, filtra o queryset: `queryset.filter(user=user_filter)`
   - Valida que o valor seja "A" ou "B"
   - Ordena por `created_at` (mais antigo primeiro)
3. **Serialização**: Retorna uma lista JSON com todas as mensagens do usuário

**Código relevante:**
```python
user_filter = request.query_params.get('user', None)
if user_filter:
    if user_filter not in ['A', 'B']:
        return Response({"error": "..."}, status=400)
    queryset = queryset.filter(user=user_filter)
queryset = queryset.order_by('created_at')
```

### Gerenciamento de Estado no React

O estado do usuário ativo é gerenciado através da **Context API** do React:

1. **Context**: `UserContext.tsx`
   - Define o tipo `UserType = 'A' | 'B'`
   - Armazena `activeUser` e `setActiveUser`
   - Exporta o hook `useUser()` para consumo nos componentes

2. **Provider**: Envolve toda a aplicação no `App.tsx`
   ```tsx
   <UserProvider>
     <Router>
       {/* Rotas */}
     </Router>
   </UserProvider>
   ```

3. **Uso nos componentes**:
   - **LoginMockado**: Usa `setActiveUser` para trocar entre A e B
   - **Chat**: Usa `activeUser` para enviar mensagens com o usuário correto
   - **Historico**: Usa `activeUser` para filtrar mensagens e atualiza quando muda

4. **Atualização automática**: Quando o usuário ativo muda, os componentes que dependem dele (Chat e Histórico) reagem automaticamente via `useEffect`:

```tsx
useEffect(() => {
  loadMessages() // ou loadHistory()
}, [activeUser]) // Recarrega quando activeUser muda
```

**Vantagens desta abordagem:**
- Estado global acessível em qualquer componente
- Atualização reativa quando o usuário muda
- Separação clara de responsabilidades
- Código mais limpo e manutenível

### Geração de Respostas Mockadas

As respostas são geradas no backend através da função `generate_mock_response()`:

```python
def generate_mock_response(user: str) -> str:
    responses = {
        'A': "Obrigado pelo seu contato, Usuário A. Em breve responderemos.",
        'B': "Obrigado pelo seu contato, Usuário B. Nossa equipe falará com você em breve.",
    }
    return responses.get(user, "Obrigado pelo seu contato. Em breve responderemos.")
```

**Fluxo:**
1. Frontend envia POST com `user` e `content`
2. Backend recebe, gera resposta baseada no usuário
3. Backend salva mensagem e resposta no banco
4. Backend retorna JSON completo para o frontend
5. Frontend exibe a mensagem e a resposta

### CORS (Cross-Origin Resource Sharing)

CORS está configurado no `settings.py` para permitir requisições do frontend:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite padrão
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]
```

Isso permite que o React (rodando em porta diferente) faça requisições para o Django.

## 🎯 Endpoints da API

### POST `/api/messages/`
Cria uma nova mensagem.

**Request:**
```json
{
  "user": "A",
  "content": "Minha mensagem"
}
```

**Response:**
```json
{
  "id": 1,
  "user": "A",
  "content": "Minha mensagem",
  "response": "Obrigado pelo seu contato, Usuário A. Em breve responderemos.",
  "created_at": "2025-01-XX..."
}
```

### GET `/api/messages/`
Lista todas as mensagens (ou filtradas por usuário).

**Query params:**
- `user` (opcional): "A" ou "B" para filtrar por usuário

**Response:**
```json
[
  {
    "id": 1,
    "user": "A",
    "content": "...",
    "response": "...",
    "created_at": "..."
  },
  ...
]
```

## 📝 Próximos Passos (Melhorias Futuras)

- [ ] Adicionar autenticação real (JWT ou sessions)
- [ ] Implementar WebSockets para chat em tempo real
- [ ] Adicionar paginação nas listagens
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar validação mais robusta no frontend
- [ ] Melhorar design com biblioteca de componentes (Material-UI, Chakra UI, etc.)
- [ ] Adicionar funcionalidade de deletar mensagens
- [ ] Implementar busca de mensagens

## 📄 Licença

MIT License

## 👤 Autor

Desenvolvido como parte de um desafio técnico.

---

**Nota**: Este projeto foi desenvolvido seguindo as especificações do desafio técnico. Todas as funcionalidades solicitadas foram implementadas e o código está pronto para avaliação.
