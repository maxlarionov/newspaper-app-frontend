import { Layout } from '../../components/layout'
import { Form, Space, Typography } from 'antd'
import { styled } from 'styled-components'
import { AuthInput } from '../../components/custom-auth-input'
import { PasswordInput } from '../../components/custom-password-input'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { useState } from 'react'
import { ErrorMessage } from '../../components/error-message'

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

const Login = () => {
	const navigate = useNavigate()
	const [loginUser, loginUserResult] = useLoginMutation()
	const [error, setError] = useState('')

	const login = async (data: UserData) => {
		try {
			await loginUser(data).unwrap()

			navigate("/")
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setError(err.data.message)
			} else {
				setError('Unknown error')
			}
		}
	}

	return (
		<Layout>
			<LoginContainer>
				<PageTitle>Login</PageTitle>
				<Form onFinish={login} style={{ margin: '20px 0px', width: '360px' }}>
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
				</Form>
				<Space direction='vertical' size='large'>
					<Typography.Text>
						Don't you have an account? <Link to={Paths.register}>Sign up</Link>
					</Typography.Text>
					<ErrorMessage message={error} />
				</Space>
			</LoginContainer>
		</Layout>
	)
}

export default Login