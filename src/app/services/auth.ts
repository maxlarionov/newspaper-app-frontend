import { User } from '../../types/user-types'
import { api } from './api'

export type UserData = Omit<User, 'id'>
type ResponseLoginData = User & { token: string }

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ResponseLoginData, UserData>({
			query: (userData) => ({
				url: '/users/login',
				method: 'POST',
				body: userData
			})
		}),
		register: builder.mutation<ResponseLoginData, UserData>({
			query: (userData) => ({
				url: '/users/register',
				method: 'POST',
				body: userData
			})
		}),
		current: builder.query<ResponseLoginData, void>({
			query: () => ({
				url: '/users/current',
				method: 'GET',
			})
		})
	})
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi

export const { endpoints: { login, register, current } } = authApi