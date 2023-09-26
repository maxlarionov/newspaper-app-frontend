import { useState } from 'react'
import { useEditArticleMutation, useGetArticleQuery } from '../../app/services/articles'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { Article } from '../../types/user-types'
import { Layout } from '../../components/layout'
import { ArticleShortForm } from '../../components/article-short-form'

type Props = {}

export const EditArticle = (props: Props) => {
	const navigate = useNavigate()
	const params = useParams<{ id: string }>()
	const [error, setError] = useState('')
	const { data, isLoading } = useGetArticleQuery(params.id || '')
	const [editArticle] = useEditArticleMutation()

	if (isLoading) {
		return <span>Loading</span>
	}

	if (!data?.article) {
		return <Navigate to='/' />
	}


	const handleEditArticle = async (article: Article) => {
		try {
			const editedArticle = {
				...data?.article,
				...article
			}

			await editArticle(editedArticle).unwrap()

			navigate(`${Paths.status}/updated`)
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setError(err.data.message)
			} else {
				setError('Unknown error')
			}
		}
	}

	return (
		<Layout>
			<ArticleShortForm
				title='Edit article'
				btnText='Edit'
				onFinish={handleEditArticle}
				error={error}
				article={data?.article}
			/>
		</Layout>
	)
}