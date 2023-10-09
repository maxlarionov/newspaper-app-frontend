import { Layout } from '../../components/layout'
import { useGetAllArticlesQuery } from '../../app/services/articles'
import { Post } from '../../components/post'
import { TopMenu } from '../../components/top-menu'
import { SubscribeBanner } from '../../components/subscribe-banner'
import { Loader } from '../../components/loader'

export const Main = () => {
	const { data, isLoading } = useGetAllArticlesQuery()

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<TopMenu />
			{data?.map(article => (
				<Post key={article.id} id={article.id} title={article.title} text={article.text} picture={article.picture} time={article.time} />
			))}
			<SubscribeBanner type='horizontal' />
		</Layout>
	)
}