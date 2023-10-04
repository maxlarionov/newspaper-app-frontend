import { useGetAllTagsQuery } from '../../app/services/tags'
import styled from 'styled-components'
import { Divider, Typography } from 'antd'
import { Paths } from '../../paths'
import { Link } from 'react-router-dom'
import { PageDivider } from '../page-divider'

const TopMenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
`
const MenuItem = styled(Typography)`
	font-weight: 400;
	font-size: 16px;

	&:hover {
		text-decoration: underline;
	}
`

type Props = {}

export const TopMenu = (props: Props) => {
	const { data, isLoading } = useGetAllTagsQuery()

	return (
		<>
			<TopMenuContainer>
				{data?.map(tag => (
					<Link to={`${Paths.tags}/${tag.id}`} key={tag.id}>
						<MenuItem>{tag.name}</MenuItem>
					</Link>
				))}
			</TopMenuContainer>
			<PageDivider />
		</>
	)
}