import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import LoginMockado from './LoginMockado'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { activeUser } = useUser()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1>Chatbot de Atendimento Simulado</h1>
          <LoginMockado />
        </div>
        <nav className="nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Chat
          </Link>
          <Link 
            to="/historico" 
            className={location.pathname === '/historico' ? 'nav-link active' : 'nav-link'}
          >
            Histórico
          </Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout

