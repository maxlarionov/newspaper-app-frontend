import styled from 'styled-components'
import { Divider, Space, Typography } from 'antd'
import { Header } from '../../components/header'
import { Layout } from '../../components/layout'

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

export const Main = () => {
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

		</Layout>
	)
}