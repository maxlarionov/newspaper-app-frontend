import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { Paths } from '../../paths'
import { Divider } from 'antd'

const PostContainer = styled.div`
	max-width: 665px;
`
const PostInner = styled.div`
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
const PostText = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 310px;
	padding: 0px 15px;
`
const PostTitle = styled.div`
	color: #000;
	font-family: Roboto Slab;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 10px;
	width: 310px;

	&:hover {
		text-decoration: underline;
	}
`
const PostDescription = styled.div`
	color: #636363;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	width: 310px;
	flex-grow: 2;
`
const PostDate = styled.div`
	color: #636363;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`
const PostDivider = styled(Divider)`
	background-color: #ACACAC;
	margin: 15px 0px;
	width: 665px;
`

type Props = {
	id: string;
	title: string;
	text: string;
	picture: string;
	time: string;
}

export const Post = ({ id, title, text, picture, time }: Props) => {
	return (
		<PostContainer>
			<PostInner>
				<Link to={`${Paths.article}/${id}`}>
					<PostPicture style={{ backgroundImage: `url(https://newspaper-app-backend.onrender.com/api/uploads/${picture})` }} />
				</Link>
				<PostText>
					<Link to={`${Paths.article}/${id}`}>
						<PostTitle>{title}</PostTitle>
					</Link>
					<PostDescription>{text.substring(0, 120)}...</PostDescription>
					<PostDate>{time}</PostDate>
				</PostText>
			</PostInner>
			<PostDivider />
		</PostContainer>
	)
}