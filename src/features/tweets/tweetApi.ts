import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'app/store'

interface Tweet {
  id: number
  author: string
  content: string
}

interface PostTweetRequest {
  content: string
}

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/'
const selectToken = (state: RootState) => state.auth.token

export const tweetApi = createApi({
  reducerPath: 'tweetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      let token = selectToken(getState() as RootState)
      if (!token) {
        // Recupera o token do localStorage se não estiver no Redux
        token = localStorage.getItem('token')
      }
      console.log('Token recuperado do estado:', token)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        console.log('Nenhum token encontrado no estado Redux ou localStorage!')
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchTweets: builder.query<Tweet[], void>({
      query: () => 'tweets/',
    }),
    postTweet: builder.mutation<void, PostTweetRequest>({
      query: (newTweet) => ({
        url: 'tweets/',
        method: 'POST',
        body: newTweet,
      }),
    }),
  }),
})

export const { useFetchTweetsQuery, usePostTweetMutation } = tweetApi
