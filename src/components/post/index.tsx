import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { Paths } from '../../paths'

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
			<Link to={`${Paths.article}/${id}`}>
				<PostPicture style={{ backgroundImage: `url('https://loremflickr.com/321/240')` }} />
			</Link>
			{/* <PostPicture style={{ backgroundImage: `url(${picture})` }} /> */}
			<PostInner>
				<Link to={`${Paths.article}/${id}`}>
					<PostTitle>{title}</PostTitle>
				</Link>
				<PostDescription>{text}</PostDescription>
				<PostDate>{time}</PostDate>
			</PostInner>
		</PostContainer>
	)
}