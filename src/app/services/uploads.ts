import { api } from './api'

export const uploadImage = api.injectEndpoints({
	endpoints: (builder) => ({
		addImage: builder.mutation({
			query: (data) => ({
				url: `/upload`,
				method: 'POST',
				body: data
			})
		}),
		removeImage: builder.mutation<string, string>({
			query: (imageName) => ({
				url: `/image/${imageName}`,
				method: 'PUT'
			})
		})
	})
})

export const { useAddImageMutation, useRemoveImageMutation } = uploadImage

export const { endpoints: { addImage, removeImage } } = uploadImage