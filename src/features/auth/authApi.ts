// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'

// Define as interfaces para os dados da requisição e resposta
interface LoginRequest {
  username: string
  password: string
}

// Interface da resposta, com tokens separados para access e refresh
export interface LoginResponse {
  access: string // Token de acesso
  refresh: string // Token de atualização
  user: string // Pode ser um objeto mais complexo, se necessário
}

interface RegisterRequest {
  username: string
  email: string
  password: string
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('Usuário registrado com sucesso:', data)
          dispatch(setCredentials({ user: data.user, token: data.access }))
          localStorage.setItem('token', data.access) // Persistir o token no localStorage
        } catch {
          // Tratar erros conforme necessário
        }
      },
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
