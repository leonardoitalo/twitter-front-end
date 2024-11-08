import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import { authApi } from 'features/auth/authApi'
import { tweetApi } from 'features/tweets/tweetApi'

export const store = configureStore({
  reducer: {
    // Adicione os reducers dos seus apis aqui
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, tweetApi.middleware),
})

// Define tipos para o estado e para o dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
