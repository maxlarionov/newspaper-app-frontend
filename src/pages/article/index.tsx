import { useState } from 'react'
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom'
import { useGetArticleQuery, useRemoveArticleMutation } from '../../app/services/articles'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { Layout } from '../../components/layout'
import styled from 'styled-components'
import { CommentOutlined, DeleteOutlined, EditOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Typography } from 'antd'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { ErrorMessage } from '../../components/error-message'

const ArticleHeader = styled.div`
	margin: 15px 0px;
`
const ArticleTitle = styled(Typography)`
	color: #000;
	font-family: Roboto Slab;
	font-size: 50px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`
const ArticleHeaderInner = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
	margin-bottom: 10px;
`
const ArticleDescription = styled(Typography)`
	max-width: 480px;
	color: #000;
	font-family: Roboto;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`
const HeaderButtons = styled.div`
	
`
const HeaderButton = styled(Button)`
	
`
const ArticleDate = styled(Typography)`
	color: #636363;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`
const ArticlePicture = styled.div`
	width: 100%;
	height: 480px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #636363;
`
const ArticleBody = styled.div`
	max-width: 720px;
	margin: 0 auto;
`
const ArticleText = styled.div`
	margin: 30px auto;
	
	color: #000;
	font-family: Roboto;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`
const ArticleButton = styled(OutlinedButton)`
	
`

export const Article = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const params = useParams<{ id: string }>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading } = useGetArticleQuery(params.id || '')
	const [removeArticle] = useRemoveArticleMutation()
	const user = useSelector(selectUser)

	if (isLoading) {
		return <span>Loading</span>
	}

	if (!data) {
		return <Navigate to='/' />
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const hideModal = () => {
		setIsModalOpen(false)
	}

	const handleDeleteArticle = async () => {
		hideModal()

		try {
			await removeArticle(data.id).unwrap()

			navigate(`${Paths.status}/deleted`)
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
			<ArticleHeader>
				<ArticleTitle>{data.title}</ArticleTitle>
				<ArticleHeaderInner>
					<ArticleDescription>More than one-third of American workers are still doing their jobs at home, according to new data from a major government survey</ArticleDescription>
					<HeaderButtons>
						<Space>
							<HeaderButton type='text' icon={<CommentOutlined />} />
							<HeaderButton type='text' icon={<StarOutlined />} />
							<HeaderButton type='text' icon={<ShareAltOutlined />} />
						</Space>
					</HeaderButtons>
				</ArticleHeaderInner>
				<ArticleDate>{data.time}</ArticleDate>
			</ArticleHeader>

			<ArticlePicture style={{ backgroundImage: `url('https://loremflickr.com/321/240')` }} />

			<ArticleBody>
				<ArticleText>{data.text}</ArticleText>

				<Space>
					<ArticleButton icon={<CommentOutlined />}>Comments</ArticleButton>
					<ArticleButton icon={<StarOutlined />}> Save</ArticleButton>
					<ArticleButton icon={<ShareAltOutlined />}>Share</ArticleButton>
					{
						user?.id === data.userId && (
							<>
								<Link to={`${Paths.articleEdit}/${data.id}`}>
									<ArticleButton icon={<EditOutlined />}>Edit</ArticleButton>
								</Link>
								<ArticleButton icon={<DeleteOutlined />} danger onClick={showModal}>Delete</ArticleButton>
							</>
						)
					}
				</Space>
				<ErrorMessage message={error} />
			</ArticleBody>
			<Modal
				title='Confirm deleted'
				open={isModalOpen}
				onOk={handleDeleteArticle} onCancel={hideModal}
				okText='Yes, delete article'
				cancelText='No, cancel'>
				Do you really want to delete the article?
			</Modal>
		</Layout >
	)
}