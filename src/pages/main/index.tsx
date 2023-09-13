import styled from 'styled-components'
import { Divider, Space, Typography } from 'antd'
import { Header } from '../../components/header'
import { Layout } from '../../components/layout'
import { useGetAllArticlesQuery } from '../../app/services/articles'
import { Post } from '../../components/post'

const TopMenu = styled.div`
	margin-bottom: 15px;
`
const MainMenu = styled.div`
	display: flex;
	justify-content: space-between;
`
const MenuItem = styled(Typography)`
	font-weight: 400;
	font-size: 16px;	
`
const TopMenuDivider = styled(Divider)`
	background-color: #000;
	margin-top: 15px;
`
const Posts = styled.div`
	max-width: 665px;
`
const PostDivider = styled(Divider)`
	background-color: #ACACAC;
	margin: 15px 0px;
`

export const Main = () => {
	const { data, isLoading } = useGetAllArticlesQuery()

	return (
		<Layout>
			<TopMenu>
				<MainMenu>
					<MenuItem>World</MenuItem>
					<MenuItem>Business</MenuItem>
					<MenuItem>Politics</MenuItem>
					<MenuItem>Sports</MenuItem>
					<MenuItem>World</MenuItem>
					<MenuItem>Business</MenuItem>
					<MenuItem>Politics</MenuItem>
					<MenuItem>Sports</MenuItem>
					<MenuItem>World</MenuItem>
					<MenuItem>Business</MenuItem>
					<MenuItem>Politics</MenuItem>
					<MenuItem>Sports</MenuItem>
				</MainMenu>
				<TopMenuDivider />
			</TopMenu>
			<Space>
				<Posts>
					{data?.map(article => (
						<div key={article.id}>
							<Post id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
							<PostDivider />
						</div>
					))}
				</Posts>
			</Space>


		</Layout>
	)
}