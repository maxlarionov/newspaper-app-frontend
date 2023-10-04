import { useEffect, useState } from 'react'
import { Layout } from '../../components/layout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { ArticleEditor } from '../../components/article-editor'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ArticleData, useAddArticleMutation } from '../../app/services/articles'
import { Paths } from '../../paths'

type Props = {}


export const AddArticle = (props: Props) => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [addArticle] = useAddArticleMutation()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	const handleAddArticle = async (article: ArticleData) => {
		try {
			await addArticle(article).unwrap()

			navigate(`${Paths.status}/created`)
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
			<ArticleEditor onFinish={handleAddArticle} />
		</Layout>
	)
}