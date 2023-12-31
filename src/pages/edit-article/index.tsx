import { useState } from 'react'
import { ArticleData, useEditArticleMutation, useGetArticleQuery } from '../../app/services/articles'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { Layout } from '../../components/layout'
import { ArticleEditor } from '../../components/article-editor'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Loader } from '../../components/loader'

type Props = {}

export const EditArticle = (props: Props) => {
	const navigate = useNavigate()
	const params = useParams<{ id: string }>()
	const [error, setError] = useState('')
	const { data, isLoading } = useGetArticleQuery(params.id || '')
	const [editArticle] = useEditArticleMutation()
	const user = useSelector(selectUser)

	if (isLoading) {
		return <Loader />
	}

	if (!data?.article || user?.id !== data.article.userId) {
		return <Navigate to='/' />
	}


	const handleEditArticle = async (article: ArticleData) => {
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
			<ArticleEditor article={data?.article} onFinish={handleEditArticle} error={error} />
		</Layout>
	)
}