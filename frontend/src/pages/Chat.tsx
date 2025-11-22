import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { messageService, Message } from '../services/api'
import './Chat.css'

const Chat: React.FC = () => {
  const { activeUser } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [activeUser])

  const loadMessages = async () => {
    try {
      const data = await messageService.getMessages(activeUser)
      setMessages(data)
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    setLoading(true)
    try {
      const newMessage = await messageService.createMessage({
        user: activeUser,
        content: inputMessage.trim(),
      })
      
      setMessages((prev) => [...prev, newMessage])
      setInputMessage('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Erro ao enviar mensagem. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat - Usuário {activeUser}</h2>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-messages">
            Nenhuma mensagem ainda. Envie sua primeira mensagem!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-container">
              <div className="message user-message">
                <div className="message-header">
                  <span className="message-user">Você (Usuário {msg.user})</span>
                  <span className="message-time">{formatDateTime(msg.created_at)}</span>
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
              <div className="message bot-message">
                <div className="message-header">
                  <span className="message-user">Atendimento</span>
                  <span className="message-time">{formatDateTime(msg.created_at)}</span>
                </div>
                <div className="message-content">{msg.response}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          rows={3}
          disabled={loading}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={loading || !inputMessage.trim()}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}

export default Chat

