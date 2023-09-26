import { Article, ArticleAndTags } from '../../types/user-types'
import { api } from './api'

// export type ArticleData = Omit<Article, 'tags'>

export const articlesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllArticles: builder.query<Article[], void>({
			query: () => ({
				url: '/articles',
				method: 'GET'
			})
		}),
		getArticle: builder.query<ArticleAndTags, string>({
			query: (id) => ({
				url: `/articles/${id}`,
				method: 'GET'
			})
		}),
		getArticlesByTag: builder.query<Article[], string>({
			query: (id) => ({
				url: `/tags/${id}`,
				method: 'GET'
			})
		}),
		addArticle: builder.mutation<Article, Article>({
			query: (article) => ({
				url: `/articles/add`,
				method: 'POST',
				body: article
			})
		}),
		removeArticle: builder.mutation<string, string>({
			query: (id) => ({
				url: `/articles/remove/${id}`,
				method: 'POST',
				body: { id }
			})
		}),
		editArticle: builder.mutation<string, Article>({
			query: (article) => ({
				url: `/articles/edit/${article.id}`,
				method: 'PUT',
				body: article
			})
		})
	})
})

export const { useGetAllArticlesQuery, useGetArticleQuery, useGetArticlesByTagQuery, useAddArticleMutation, useRemoveArticleMutation, useEditArticleMutation } = articlesApi

export const { endpoints: { getAllArticles, getArticle, getArticlesByTag, addArticle, removeArticle, editArticle } } = articlesApi