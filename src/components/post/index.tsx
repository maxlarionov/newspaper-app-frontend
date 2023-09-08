import { styled } from 'styled-components'
import logo from '../../assets/images/logo.png'

const PostContainer = styled.div`
	display: flex;
`
const PostPicture = styled.div`
	width: 340px;
	height: 180px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #636363;
`
const PostInner = styled.div`
	display: flex;
	flex-direction: column;
`
const PostTitle = styled.div`
	
`
const PostDescription = styled.div`
	width: 340px;
`
const PostDate = styled.div`
	
`



type Props = {
	title: string;
	text: string;
	picture: string;
	time: string;
}

export const Post = ({ title, text, picture, time }: Props) => {
	return (
		<PostContainer>
			<PostPicture style={{ backgroundImage: `url(${picture})` }} />
			<PostInner>
				<PostTitle>{title}</PostTitle>
				<PostDescription>{text}</PostDescription>
				<PostDate>{time}</PostDate>
			</PostInner>
		</PostContainer>
	)
}