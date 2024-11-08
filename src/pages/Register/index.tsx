import React, { useState } from 'react'
import { useRegisterMutation } from 'features/auth/authApi'
import { Link, useNavigate } from 'react-router-dom'
import {
  PrimaryActionButton,
  FormInputBox,
  AuthCheckoutFormContainer,
  AuthCheckoutPageContainer,
  FormContent,
} from 'styles/GlobalStyledsComponents'
import { GoToLoginLink } from './styles'

interface RegisterError {
  status: number
  data: {
    message: string
  }
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [register, { isLoading }] = useRegisterMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({ username, email, password }).unwrap()
      navigate('/login') // Redireciona para a página de login
    } catch (err: unknown) {
      const error = err as RegisterError
      if (error.status === 400) {
        // Aqui você pode verificar o tipo de erro retornado pela API
        if (error.data?.message === 'Usuário já existe') {
          setErrorMessage('Esse nome de usuário já está em uso.') // Erro de nome de usuário já existente
        } else if (error.data?.message === 'Credenciais incorretas') {
          setErrorMessage('As credenciais fornecidas são inválidas.') // Caso o erro seja de credenciais
        } else {
          setErrorMessage('Erro ao registrar. Tente novamente mais tarde.') // Outro erro genérico
        }
      } else {
        setErrorMessage('Erro ao registrar. Tente novamente mais tarde.') // Caso ocorra outro tipo de erro
      }
    }
  }

  return (
    <AuthCheckoutPageContainer>
      <AuthCheckoutFormContainer>
        <FormContent>
          <h1>Cadastro</h1>
          <p>Olá! Preencha seus dados.</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <FormInputBox>
              <label>Nome</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormInputBox>
            <FormInputBox>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <PrimaryActionButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </PrimaryActionButton>
          </form>
        </FormContent>
        <GoToLoginLink>
          <span>Ja possui Login?</span>
          <Link to={'/login'}>Ir para a página de login</Link>
        </GoToLoginLink>
      </AuthCheckoutFormContainer>
    </AuthCheckoutPageContainer>
  )
}

export default Register
