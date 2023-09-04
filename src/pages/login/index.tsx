import { Layout } from '../../components/layout'
import { Form, Space, Typography } from 'antd'
import { styled } from 'styled-components'
import { AuthInput } from '../../components/custom-auth-input'
import { PasswordInput } from '../../components/custom-password-input'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

const LoginContainer = styled.div`
	margin: 0 auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const PageTitle = styled(Typography)`
	font-size: 25px;
	font-weight: 700;
`
const LoginForm = styled(Form)`
	margin: 20px 0px;
	width: 360px;
`

const Login = () => {
	return (
		<Layout>
			<LoginContainer>
				<PageTitle>Login</PageTitle>
				<LoginForm onFinish={() => null}>
					<AuthInput
						name='email'
						placeholder='Email'
						type='email'
					/>
					<PasswordInput
						name="password"
						placeholder='Password'
					/>
					<OutlinedButton
						type='primary'
						htmlType='submit'
					>
						Log in
					</OutlinedButton>
				</LoginForm>
				<Space direction='vertical' size='large'>
					<Typography.Text>
						Don't you have an account? <Link to={Paths.register}>Sign up</Link>
					</Typography.Text>
				</Space>
			</LoginContainer>
		</Layout>
	)
}

export default Login