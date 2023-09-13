import { Divider, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.div`
	width: 100%;
	margin-top: 60px;
`
const FooterDivider = styled(Divider)`
	background-color: #ACACAC;
	margin: 0px;
`
const FooterMenu = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 0px auto;
	padding: 40px;
	max-width: 1020px; 
`
const FooterMenuItem = styled(Typography)`
	color: #636363;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`

type Props = {}

export const Footer = (props: Props) => {
	return (
		<FooterContainer>
			<FooterDivider />
			<FooterMenu>
				<FooterMenuItem>© 2023 The Newspaper Post</FooterMenuItem>
				<Link to={'#'}>
					<FooterMenuItem>Contact Us</FooterMenuItem>
				</Link>
				<Link to={'#'}>
					<FooterMenuItem>Advertise</FooterMenuItem>
				</Link>
				<Link to={'#'}>
					<FooterMenuItem>Help</FooterMenuItem>
				</Link>
				<Link to={'#'}>
					<FooterMenuItem>Subscription</FooterMenuItem>
				</Link>
				<Link to={'#'}>
					<FooterMenuItem>Privacy Police</FooterMenuItem>
				</Link>
			</FooterMenu>
		</FooterContainer>
	)
}