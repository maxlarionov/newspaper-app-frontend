import { Divider } from 'antd'
import styled from 'styled-components'
import menuIcon from '../../assets/icons/menu-icon.svg'
import logo from '../../assets/images/logo.png'
import { OutlinedButton } from '../custom-outlined-button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

const HeaderSection = styled.header`
	width: 100%;
	background: #FFF;
	position: fixed;
`

const HeaderInner = styled.div`
	display: flex;
	padding: 15px 0px;
	align-items: center;
	max-width: 1020px;
	margin: 0 auto;
	justify-content: space-between;
`

const MenuButton = styled.img`
	cursor: pointer;
`
const Logo = styled.img`
	width: 200px;
`
const HeaderDivider = styled(Divider)`
background-color: #ACACAC;
	margin: 0px;
`

export const Header = () => {
	return (
		<HeaderSection>
			<HeaderInner>
				<MenuButton src={menuIcon} />
				<Link to={Paths.home}>
					<Logo src={logo} />
				</Link>
				<Link to={Paths.login}>
					<OutlinedButton>
						Log in
					</OutlinedButton>
				</Link>
			</HeaderInner>
			<HeaderDivider />
		</HeaderSection>
	)
}
