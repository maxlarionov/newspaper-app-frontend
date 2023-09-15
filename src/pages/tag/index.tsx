import React, { useState } from 'react'
import { Layout } from '../../components/layout'
import { useGetArticlesByTagQuery } from '../../app/services/tags'
import { useNavigate, useParams } from 'react-router-dom'
import { Post } from '../../components/post'
import styled from 'styled-components'
import { Divider } from 'antd'
import { TopMenu } from '../../components/top-menu'

type Props = {}

export const Tag = (props: Props) => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const params = useParams<{ id: string }>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading } = useGetArticlesByTagQuery(params.id || '')
	// const [removeArticle] = useRemoveArticleMutation()
	// const user = useSelector(selectUser)

	return (
		<Layout>
			<TopMenu />
			{data?.map(article => (
				<Post key={article.id} id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
			))}
		</Layout>
	)
}