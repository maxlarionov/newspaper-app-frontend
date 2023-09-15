import React, { useState } from 'react'
import { Layout } from '../../components/layout'
import { useGetArticlesByTagQuery } from '../../app/services/tags'
import { useNavigate, useParams } from 'react-router-dom'
import { Post } from '../../components/post'
import styled from 'styled-components'
import { Divider } from 'antd'

const PostDivider = styled(Divider)`
	background-color: #ACACAC;
	margin: 15px 0px;
`

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
			{data?.map(article => (
				<div key={article.id}>
					<Post id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
					<PostDivider />
				</div>
			))}
		</Layout>
	)
}