import { api } from './api'

export const uploadImage = api.injectEndpoints({
	endpoints: (builder) => ({
		addImage: builder.mutation({
			query: (data) => ({
				url: `/upload`,
				method: 'POST',
				body: data
			})
		})
	})
})

export const { useAddImageMutation } = uploadImage

export const { endpoints: { addImage } } = uploadImage