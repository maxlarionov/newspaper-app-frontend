import { Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'
import { Layout } from '../../components/layout'
import { OutlinedButton } from '../../components/custom-outlined-button'
import { useRemoveUserMutation } from '../../app/services/user'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../../components/error-message'

const ProfileInfo = styled.div`
	margin: 20px 0px;
`
const NameContainer = styled.div`
	display: flex;
	gap: 10px;
`
const EmailContainer = styled.div`
	display: flex;
	gap: 10px;
`
const ProfileText = styled(Typography)`
	color: #000;
	font-family: Roboto;
	font-size: 18px;
	margin-right: 10px;
`
const ProfileData = styled(Typography)`
	color: #000;
	font-family: Roboto;
	font-size: 18px;
	margin-right: 10px;
	font-weight: 600;
`

type Props = {}

export const Profile = (props: Props) => {
	const user = useSelector(selectUser)
	const [error, setError] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [removeUser] = useRemoveUserMutation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const hideModal = () => {
		setIsModalOpen(false)
	}

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/')
	}

	const handleDeleteUser = async () => {
		hideModal()

		try {
			if (user !== null)
				await removeUser(user.id).unwrap()

			onLogoutClick()
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
			<ProfileInfo>
				<NameContainer>
					<ProfileText>Your name:</ProfileText>
					<ProfileData>{user?.name}</ProfileData>
				</NameContainer>
				<EmailContainer>
					<ProfileText>Your email:</ProfileText>
					<ProfileData>{user?.email}</ProfileData>
				</EmailContainer>
			</ProfileInfo>
			<Space>
				<OutlinedButton onClick={() => setIsModalOpen(true)} danger>Delete user</OutlinedButton>
			</Space>
			<Modal
				title='Confirm deleted'
				open={isModalOpen}
				onOk={handleDeleteUser} onCancel={hideModal}
				okText='Yes, delete user'
				cancelText='No, cancel'>
				Do you really want to delete this user?
			</Modal>
			<ErrorMessage message={error} />
		</Layout>
	)
}