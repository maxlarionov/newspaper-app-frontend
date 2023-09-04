import { Layout } from '../../components/layout'
import { Form, Space, Typography } from 'antd'
import { styled } from 'styled-components'
import { AuthInput } from '../../components/custom-auth-input'
import { PasswordInput } from '../../components/custom-password-input'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

const RegisterContainer = styled.div`
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
const RegisterForm = styled(Form)`
	margin: 20px 0px;
	width: 360px;
`

const Register = () => {
	return (
		<Layout>
			<RegisterContainer>
				<PageTitle>Register</PageTitle>
				<RegisterForm onFinish={() => null}>
					<AuthInput
						name='name'
						placeholder='Name'
					/>
					<AuthInput
						name='email'
						placeholder='Email'
						type='email'
					/>
					<PasswordInput
						name="password"
						placeholder='Password'
					/>
					<PasswordInput
						name="confirmPassword"
						placeholder='Repeat the password'
					/>
					<OutlinedButton
						type='primary'
						htmlType='submit'
					>
						Sign up
					</OutlinedButton>
				</RegisterForm>
				<Space direction='vertical' size='large'>
					<Typography.Text>
						Do you have an account? <Link to={Paths.login}>Log in</Link>
					</Typography.Text>
				</Space>
			</RegisterContainer>
		</Layout>
	)
}

export default Register