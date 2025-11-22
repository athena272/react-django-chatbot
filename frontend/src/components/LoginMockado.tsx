import { useUser } from '../contexts/UserContext'
import './LoginMockado.css'

const LoginMockado: React.FC = () => {
  const { activeUser, setActiveUser } = useUser()

  return (
    <div className="login-mockado">
      <span className="login-label">Usuário ativo:</span>
      <div className="login-buttons">
        <button
          className={`user-button ${activeUser === 'A' ? 'active' : ''}`}
          onClick={() => setActiveUser('A')}
        >
          Usuário A
        </button>
        <button
          className={`user-button ${activeUser === 'B' ? 'active' : ''}`}
          onClick={() => setActiveUser('B')}
        >
          Usuário B
        </button>
      </div>
      <span className="active-user-badge">Usuário {activeUser} selecionado</span>
    </div>
  )
}

export default LoginMockado

