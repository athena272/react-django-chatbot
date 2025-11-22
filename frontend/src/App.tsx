import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import Layout from './components/Layout'
import Chat from './pages/Chat'
import Historico from './pages/Historico'
import './App.css'

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/historico" element={<Historico />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  )
}

export default App

