import React from 'react'
import { useGetAllTagsQuery } from '../../app/services/tags'
import styled from 'styled-components'
import { Typography } from 'antd'
import { Paths } from '../../paths'
import { Link } from 'react-router-dom'

const MainMenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
`
const MenuItem = styled(Typography)`
	font-weight: 400;
	font-size: 16px;	
`

type Props = {}

export const MainMenu = (props: Props) => {
	const { data, isLoading } = useGetAllTagsQuery()

	return (
		<MainMenuContainer>
			{data?.map(tag => (
				<Link to={`${Paths.tags}/${tag.id}`}>
					<MenuItem>{tag.name}</MenuItem>
				</Link>
			))}
		</MainMenuContainer>
	)
}