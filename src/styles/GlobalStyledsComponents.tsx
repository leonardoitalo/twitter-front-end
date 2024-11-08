import styled from 'styled-components'
import { colors } from 'styles/variablesCss'

// Container principal da página de autenticação e checkout
export const AuthCheckoutPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: ${colors.grafite};
`

// Contêiner de formulário que pode servir para login, cadastro ou checkout
export const AuthCheckoutFormContainer = styled.div`
  height: 748px;
  border-radius: 32px;
  background-color: ${colors.grayDark};
  padding: 56px 62px;
  color: #e1e1e1;
`

// Estrutura de conteúdo do formulário
export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  h1 {
    margin-bottom: -8px;
  }
`

// Caixa de entrada para campos dentro de formulários
export const FormInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 400px;
  margin-bottom: 16px;

  input {
    background-color: ${colors.grayMid};
    border-radius: 4px;
    padding: 8px 16px;
    width: 306px;
  }
`

// Botão de ação, para login, cadastro ou finalizar checkout
export const PrimaryActionButton = styled.button`
  width: 386px;
  height: 50px;
  padding: 12px 0px;
  background-color: ${colors.green};
  border: 0px solid;
  border-radius: 8px;
`
