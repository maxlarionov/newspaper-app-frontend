import { useState } from 'react'
import { Layout } from '../../components/layout'
import { Form, Space, Typography } from 'antd'
import { styled } from 'styled-components'
import { AuthInput } from '../../components/custom-auth-input'
import { PasswordInput } from '../../components/custom-password-input'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useRegisterMutation } from '../../app/services/auth'
import { User } from '../../types/user-types'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/error-message'

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

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

const Register = () => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [error, setError] = useState('')
	const [registerUser] = useRegisterMutation()

	const register = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap()

			navigate(`${Paths.login}`)
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
			<RegisterContainer>
				<PageTitle>Register</PageTitle>
				<Form onFinish={register} style={{ margin: '20px 0px', width: '360px' }}>
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
				</Form>
				<Space direction='vertical' size='large'>
					<Typography.Text>
						Do you have an account? <Link to={Paths.login}>Log in</Link>
					</Typography.Text>
					<ErrorMessage message={error} />
				</Space>
			</RegisterContainer>
		</Layout>
	)
}

export default Register