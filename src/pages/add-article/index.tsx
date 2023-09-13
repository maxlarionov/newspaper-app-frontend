import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout'
import { ArticleShortForm } from '../../components/article-short-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddArticleMutation } from '../../app/services/articles'
import { Article } from '../../types/user-types'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

type Props = {}


export const AddArticle = (props: Props) => {
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [addArticle] = useAddArticleMutation()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	const handleAddArticle = async (data: Article) => {
		try {
			await addArticle(data).unwrap()

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
			<ArticleShortForm
				title='Add article'
				btnText='Add'
				onFinish={handleAddArticle}
				error={error}
			/>
		</Layout>
	)
}