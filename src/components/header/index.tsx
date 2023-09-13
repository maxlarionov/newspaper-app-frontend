import { Divider } from 'antd'
import styled from 'styled-components'
import menuIcon from '../../assets/icons/menu-icon.svg'
import logo from '../../assets/images/logo.png'
import { OutlinedButton } from '../custom-outlined-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

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
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/')
	}

	return (
		<HeaderSection>
			<HeaderInner>
				<MenuButton src={menuIcon} />
				<Link to={Paths.home}>
					<Logo src={logo} />
				</Link>

				{
					user ? (
						<>
							<Link to={Paths.articleAdd}>
								<OutlinedButton>
									Add
								</OutlinedButton>
							</Link>
							<OutlinedButton
								onClick={onLogoutClick}
							>
								Log out
							</OutlinedButton>
						</>
					) : (
						<Link to={Paths.login}>
							<OutlinedButton>
								Log in
							</OutlinedButton>
						</Link>
					)
				}
			</HeaderInner>
			<HeaderDivider />
		</HeaderSection>
	)
}
