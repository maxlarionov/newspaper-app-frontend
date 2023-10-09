import { User } from '../../types/types'
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
		}),
		removeUser: builder.mutation<string, string>({
			query: (id) => ({
				url: `/users/remove/${id}`,
				method: 'POST',
				body: { id }
			})
		}),
	})
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery, useRemoveUserMutation } = authApi

export const { endpoints: { login, register, current, removeUser } } = authApi