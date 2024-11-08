import styled from 'styled-components'
import { colors } from 'styles/variablesCss'

export const FeedPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${colors.grafite};
  padding: 64px 0;
`

export const Nav = styled.div`
  display: flex;
  align-items: flex-end;

  nav {
    display: flex;
    flex-direction: column;

    a {
      font-size: 24px;
      color: white;
    }
  }
`

export const TweetsContainer = styled.main`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Tweet = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  gap: 12px;
  border-radius: 16px;
  padding: 8px;
  color: white;
  background-color: ${colors.grayDark};

  img {
    width: 40px;
  }

  h3 {
    font-size: 18px;
  }
`
