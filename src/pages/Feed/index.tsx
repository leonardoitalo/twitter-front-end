import { useFetchTweetsQuery } from 'features/tweets/tweetApi'
import Post from 'components/Post'
import { TweetsContainer, FeedPageContainer, Tweet } from './styles'

const Feed = () => {
  const { data: tweets, isLoading, error } = useFetchTweetsQuery()

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar tweets.</p>

  return (
    <FeedPageContainer>
      <Post />
      <TweetsContainer>
        {tweets &&
          tweets.map((tweet) => (
            <Tweet key={tweet.id}>
              <div>
                <img src="/foto.png" alt="Foto do usuário" />
              </div>
              <div>
                <h3>{tweet.author}</h3>
                <p>{tweet.content}</p>
              </div>
            </Tweet>
          ))}
      </TweetsContainer>
    </FeedPageContainer>
  )
}

export default Feed
