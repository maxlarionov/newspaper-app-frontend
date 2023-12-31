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
import { Tag } from '../../types/types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Loader } from '../../components/loader'

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

	@media (max-width: 740px) {
		font-size: 42px;
	}

	@media (max-width: 680px) {
		font-size: 36px;
	}
`
const ArticleHeaderInner = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
	margin-bottom: 10px;
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

	@media (max-width: 740px) {
		height: 360px;
	}

	@media (max-width: 480px) {
		height: 240px;
	}

	@media (max-width: 380px) {
		height: 160px;
	}
`
const ArticleBody = styled.div`
	max-width: 720px;
	margin: 0 auto;
`
const ArticleText = styled(Markdown)`
	margin: 30px auto;
	color: #000;
	font-family: Roboto;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	@media (max-width: 740px) {
		font-size: 16px;
	}
`
const ArticleButton = styled(OutlinedButton)`
	
`
const Tags = styled.div`
	display: flex;
	margin: 15px 0px;
`
const TagsText = styled(Typography)`
	color: #000;
	font-family: Roboto;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-right: 10px;
`
const TagsItem = styled(Typography)`
	font-family: Roboto;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-decoration: underline;

	&:hover{
		color: #4096ff;
		text-decoration: none;
	}
`
const ArticleActions = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
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
		return <Loader />
	}

	if (!data?.article) {
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
			await removeArticle(data?.article.id).unwrap()

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
				<ArticleTitle>{data?.article.title}</ArticleTitle>
				<ArticleHeaderInner>
					<Tags>
						<TagsText>
							Tags:
						</TagsText>
						<Space>
							{data.tags.map((tag: Tag) => (
								<Link to={`${Paths.tags}/${tag.id}`} key={tag.id}>
									<TagsItem>{tag.name}</TagsItem>
								</Link>
							))}
						</Space>
					</Tags>
					<HeaderButtons>
						<Space>
							<HeaderButton type='text' icon={<CommentOutlined />} />
							<HeaderButton type='text' icon={<StarOutlined />} />
							<HeaderButton type='text' icon={<ShareAltOutlined />} />
						</Space>
					</HeaderButtons>
				</ArticleHeaderInner>
				<ArticleDate>{data.article.time}</ArticleDate>
			</ArticleHeader>

			<ArticlePicture style={{ backgroundImage: `url(https://newspaper-app-backend.onrender.com/api/uploads/${data.article.picture})` }} />

			<ArticleBody>
				<ArticleText children={data.article.text} remarkPlugins={[remarkGfm]} />

				<ArticleActions>
					<ArticleButton icon={<CommentOutlined />}>Comments</ArticleButton>
					<ArticleButton icon={<StarOutlined />}> Save</ArticleButton>
					<ArticleButton icon={<ShareAltOutlined />}>Share</ArticleButton>
					{
						user?.id === data.article.userId && (
							<>
								<Link to={`${Paths.articleEdit}/${data.article.id}`}>
									<ArticleButton icon={<EditOutlined />}>Edit</ArticleButton>
								</Link>
								<ArticleButton icon={<DeleteOutlined />} danger onClick={showModal}>Delete</ArticleButton>
							</>
						)
					}
				</ArticleActions>
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