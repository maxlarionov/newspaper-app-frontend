import { Layout } from '../../components/layout'
import { useGetArticlesByTagQuery } from '../../app/services/articles'
import { useParams } from 'react-router-dom'
import { Post } from '../../components/post'
import styled from 'styled-components'
import { Typography } from 'antd'
import { TopMenu } from '../../components/top-menu'
import { SubscribeBanner } from '../../components/subscribe-banner'
import { useSelector } from 'react-redux'
import { selectTags } from '../../features/tags/tagsSlice'
import { Loader } from '../../components/loader'

const Posts = styled.div`

`
const Main = styled.div`
	display: flex;

	@media (max-width: 680px) {
		display: block;
	}
`
const TagName = styled(Typography)`
	color: #000;
	font-family: Roboto;
	font-size: 50px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	display: block;
	margin: 40px auto;

	@media (max-width: 680px) {
		text-align: center;
	}
`

type Props = {}

export const Tag = (props: Props) => {
	const params = useParams<{ id: string }>()
	const { data, isLoading } = useGetArticlesByTagQuery(params.id || '')
	const tags = useSelector(selectTags)
	const tag = tags?.find((tag) => tag.id === params.id)

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<TopMenu />
			<TagName>{tag?.name}</TagName>
			<Main>
				<Posts>
					{data?.map(article =>
						<Post key={article.id} id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
					)}
				</Posts>
				<SubscribeBanner type='vertical' />
			</Main>
		</Layout>

	)
}