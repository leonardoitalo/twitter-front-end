import styled from 'styled-components'
import { colors } from 'styles/variablesCss'

export const PostContainer = styled.div`
  width: 512px;
  height: 192px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 16px;
  padding: 14px;
  color: white;
  background-color: ${colors.grayDark};

  h2 {
    font-size: 26px;
  }

  textarea {
    resize: none;
    width: 388px;
  }
`
