import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { PageDivider } from '../page-divider'

const SubscribeContainer = styled.div<Props>`
	${(props) => (props.type === 'vertical' ? 'display: flex' : 'display: block')};

	@media (max-width: 1020px) {
		display: none;
	}
`
const SubscribeContent = styled.div<Props>`
	text-align: center;
	${(props) => (props.type === 'vertical' ? 'margin: 120px 60px' : 'margin: 30px auto')};
`
const SubscribeText = styled(Typography)`
	color: #000;
	font-family: Roboto Slab;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 20px;
`
const SubscribeButton = styled(Button)`
	background: #277ED5;
	font-family: Roboto;
	margin-bottom: 15px;
`
const SubscribeBenefits = styled(Typography)`
	color: #636363;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`

type Props = {
	type?: 'horizontal' | 'vertical' | undefined;
}

export const SubscribeBanner = ({ type }: Props) => {
	return (
		<SubscribeContainer type={type}>
			{type === 'vertical' && <PageDivider type={type} />}
			<SubscribeContent type={type}>
				<SubscribeText>
					Don't miss any news by subscribing to The Newspaper Post
				</SubscribeText>
				<SubscribeButton type='primary' shape='round' size='large'>
					Subscribe
				</SubscribeButton>
				<SubscribeBenefits>
					Unlimited access / interactive stories / exclusive e-books
				</SubscribeBenefits>
			</SubscribeContent>
			{type === 'horizontal' && <PageDivider type={type} />}
		</SubscribeContainer>
	)
}