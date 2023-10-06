import { Drawer, Space, Button, Typography } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import menuIcon from '../../assets/icons/menu-icon.svg'
import { useGetAllTagsQuery } from '../../app/services/tags'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

const MenuButton = styled.img`
	cursor: pointer;
`
const MenuItem = styled(Typography)`
	font-weight: 400;
	font-size: 16px;
	margin-bottom: 10px;

	&:hover {
		text-decoration: underline;
	}
`

type Props = {}

export const MenuDrawer = (props: Props) => {
	const [openDrawer, setOpenDrawer] = useState(false)
	const { data, isLoading } = useGetAllTagsQuery()

	const onClose = () => {
		setOpenDrawer(false)
	}
	return (
		<>
			<MenuButton src={menuIcon} onClick={() => setOpenDrawer(true)} />
			<Drawer
				title='Menu'
				placement='left'
				onClose={onClose}
				open={openDrawer}
			>
				{data?.map(tag => (
					<Link to={`${Paths.tags}/${tag.id}`} key={tag.id}>
						<MenuItem onClick={() => setOpenDrawer(false)}>{tag.name}</MenuItem>
					</Link>
				))}
			</Drawer>
		</>
	)
}