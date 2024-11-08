import { createGlobalStyle } from 'styled-components'
import { colors } from './variablesCss'

export const GlobalStyles = createGlobalStyle`
  html {
    background-color: ${colors.grafite};
  }
`
