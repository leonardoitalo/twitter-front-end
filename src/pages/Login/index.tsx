import React, { useState } from 'react'
import { useLoginMutation } from 'features/auth/authApi'
import {
  PrimaryActionButton,
  FormInputBox,
  AuthCheckoutFormContainer,
  AuthCheckoutPageContainer,
  FormContent,
} from 'styles/GlobalStyledsComponents'
import { useNavigate } from 'react-router-dom'

interface LoginError {
  status: number
  data: {
    message: string
  }
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Impede o comportamento padrão de envio do formulário
    try {
      setErrorMessage('')
      const response = await login({ username, password }).unwrap()

      // Salva o token de acesso no localStorage para autenticação futura
      if (response.access) {
        localStorage.setItem('accessToken', response.access)
        localStorage.setItem('refreshToken', response.refresh)

        console.log('Usuário logado com sucesso:', response)

        // Redireciona para a página de feed após login bem-sucedido
        navigate('/feed')
      }
    } catch (err: unknown) {
      console.error('Falha no login:', err)

      if ((err as LoginError).status === 400) {
        const error = err as LoginError
        if (error.data?.message === 'Credenciais inválidas') {
          setErrorMessage('Nome de usuário ou senha incorretos.')
        } else {
          setErrorMessage('Erro ao fazer login. Tente novamente mais tarde.')
        }
      } else {
        setErrorMessage('Erro ao fazer login. Tente novamente mais tarde.')
      }
    }
  }

  return (
    <AuthCheckoutPageContainer>
      <AuthCheckoutFormContainer>
        <FormContent onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Boas-vindas! Faça seu login.</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <FormInputBox>
            <label>Nome de Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormInputBox>
          <FormInputBox>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormInputBox>
          <PrimaryActionButton type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Login'}
          </PrimaryActionButton>
        </FormContent>
      </AuthCheckoutFormContainer>
    </AuthCheckoutPageContainer>
  )
}

export default Login
