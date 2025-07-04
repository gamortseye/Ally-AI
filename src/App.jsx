import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AllyCard from './LandingPage'
import LoginPage from './LoginPage'
import InterfaceAi from './InterfaceAi'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AllyCard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/interface" element={<InterfaceAi />} />
    </Routes>
  )
}

export default App