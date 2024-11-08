import { createGlobalStyle } from 'styled-components'

const Reset = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f8f8f8;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, button, select {
    font: inherit;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  html, body {
    min-height: 100%;
  }
`

export default Reset
