import { Tag } from '../../types/user-types'
import { api } from './api'

export const tagsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllTags: builder.query<Tag[], void>({
			query: () => ({
				url: '/tags',
				method: 'GET'
			})
		}),
		addTag: builder.mutation<Tag, Tag>({
			query: (tag) => ({
				url: `/tags/add`,
				method: 'POST',
				body: tag
			})
		}),
		removeTag: builder.mutation<string, string>({
			query: (id) => ({
				url: `/tags/remove/${id}`,
				method: 'POST',
				body: { id }
			})
		}),
		editTag: builder.mutation<string, Tag>({
			query: (tag) => ({
				url: `/tags/edit/${tag.id}`,
				method: 'PUT',
				body: tag
			})
		}),
	})
})

export const { useGetAllTagsQuery, useAddTagMutation, useRemoveTagMutation, useEditTagMutation } = tagsApi

export const { endpoints: { getAllTags, addTag, removeTag, editTag } } = tagsApi