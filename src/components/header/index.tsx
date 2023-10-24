import { Button, Divider, Dropdown, MenuProps } from 'antd'
import styled from 'styled-components'
import logo from '../../assets/images/logo.png'
import { OutlinedButton } from '../custom-outlined-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'
import { UserOutlined } from '@ant-design/icons'
import { MenuDrawer } from '../menu-drawer'

const HeaderSection = styled.header`
	width: 100%;
	background: #FFF;
	position: fixed;
	z-index: 100;
`
const HeaderInner = styled.div`
	display: flex;
	padding: 15px 0px;
	align-items: center;
	max-width: 1020px;
	margin: 0 auto;
	justify-content: space-between;

	@media (max-width: 1040px) {
		padding: 5px 10px;
	}
`
const Logo = styled.img`
	width: 200px;
`
const HeaderDivider = styled(Divider)`
background-color: #ACACAC;
	margin: 0px;
`
const LogOut = styled(Button)`
	padding: 0px;
	line-height: normal;
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

	const items: MenuProps['items'] = [
		{
			label: <Link to={`${Paths.profile}/${user?.id}`}>{user?.name}'s profile</Link>,
			key: '0',
		},
		{
			label: <Link to={Paths.articleAdd}>Add article</Link>,
			key: '1',
		},
		{
			type: 'divider',
		},
		{
			label: <LogOut type='link' onClick={onLogoutClick}>Log out</LogOut>,
			key: '2',
		},
	];

	return (
		<HeaderSection>
			<HeaderInner>
				<MenuDrawer />
				<Link to={Paths.home}>
					<Logo src={logo} />
				</Link>
				{
					user ? (
						<>
							<Dropdown menu={{ items }} trigger={['click']}>
								<UserOutlined />
							</Dropdown>
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
