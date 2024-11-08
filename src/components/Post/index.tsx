import { usePostTweetMutation } from 'features/tweets/tweetApi'
import { PrimaryActionButton } from 'styles/GlobalStyledsComponents'
import { PostContainer } from './styles'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'

export const Post = () => {
  const [content, setContent] = useState('')
  const [postTweet, { isLoading, error }] = usePostTweetMutation()
  const token = useSelector((state: RootState) => state.auth.token) // Pegando o token do Redux

  const [isTokenReady, setIsTokenReady] = useState(false)

  // UseEffect para esperar o token ser carregado no Redux
  useEffect(() => {
    if (token) {
      console.log('Token:', token)
      setIsTokenReady(true)
    }
  }, [token])

  const handlePostTweet = async () => {
    if (!content) return
    if (!token) {
      console.log('Erro: token não disponível ainda.')
      return
    }

    try {
      await postTweet({ content }).unwrap()
      setContent('') // Limpa o campo após o post
    } catch (error) {
      console.error('Erro ao postar tweet:', error)
    }
  }

  return (
    <PostContainer>
      <h2>Insira sua Mensagem</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva seu tweet aqui..."
      />
      <PrimaryActionButton
        onClick={handlePostTweet}
        disabled={isLoading || !isTokenReady}
      >
        {isLoading ? 'Postando...' : 'Postar'}
      </PrimaryActionButton>
      {error && <p>Erro ao tentar postar: {JSON.stringify(error)}</p>}
    </PostContainer>
  )
}

export default Post
