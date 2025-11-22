import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { messageService, Message } from '../services/api'
import './Historico.css'

const Historico: React.FC = () => {
  const { activeUser } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [activeUser])

  const loadHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await messageService.getMessages(activeUser)
      setMessages(data)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      setError('Erro ao carregar histórico. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
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
      second: '2-digit',
    })
  }

  return (
    <div className="historico-container">
      <div className="historico-header">
        <h2>Histórico - Usuário {activeUser}</h2>
        <button className="refresh-button" onClick={loadHistory} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && messages.length === 0 ? (
        <div className="loading-message">Carregando histórico...</div>
      ) : messages.length === 0 ? (
        <div className="empty-history">
          Nenhuma mensagem no histórico para o Usuário {activeUser}.
        </div>
      ) : (
        <div className="historico-list">
          {messages.map((msg) => (
            <div key={msg.id} className="historico-item">
              <div className="historico-item-header">
                <span className="historico-user">Usuário {msg.user}</span>
                <span className="historico-date">{formatDateTime(msg.created_at)}</span>
              </div>
              <div className="historico-content-section">
                <div className="historico-content-item">
                  <span className="content-label">Mensagem:</span>
                  <p className="content-text">{msg.content}</p>
                </div>
                <div className="historico-content-item">
                  <span className="content-label">Resposta:</span>
                  <p className="content-text response">{msg.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Historico

