import { useGetAllTagsQuery } from '../../app/services/tags'
import styled from 'styled-components'
import { Typography } from 'antd'
import { Paths } from '../../paths'
import { Link } from 'react-router-dom'

const TopMenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
`
const MenuItem = styled(Typography)`
	font-weight: 400;
	font-size: 16px;	
`

type Props = {}

export const TopMenu = (props: Props) => {
	const { data, isLoading } = useGetAllTagsQuery()

	return (
		<TopMenuContainer>
			{data?.map(tag => (
				<Link to={`${Paths.tags}/${tag.id}`}>
					<MenuItem>{tag.name}</MenuItem>
				</Link>
			))}
		</TopMenuContainer>
	)
}