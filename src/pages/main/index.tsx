import styled from 'styled-components'
import { Space } from 'antd'
import { Layout } from '../../components/layout'
import { useGetAllArticlesQuery } from '../../app/services/articles'
import { Post } from '../../components/post'
import { TopMenu } from '../../components/top-menu'

const Posts = styled.div`
	max-width: 665px;
`

export const Main = () => {
	const { data, isLoading } = useGetAllArticlesQuery()

	return (
		<Layout>
			<TopMenu />
			<Space>
				<Posts>
					{data?.map(article => (
						<Post key={article.id} id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
					))}
				</Posts>
			</Space>
		</Layout>
	)
}