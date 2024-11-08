import Checkout from 'pages/Register'
import Feed from 'pages/Feed'
import Login from 'pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  // Verifica a presença do token de autenticação no localStorage
  return !!localStorage.getItem('accessToken')
}

// Componente para proteger a rota
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota de cadastro */}
        <Route path="/register" element={<Checkout />} />

        {/* Rota protegida de Feed */}
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        {/* Rota padrão (redireciona para /register) */}
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
