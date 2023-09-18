import { Divider } from 'antd'
import styled from 'styled-components'

const PageDividerStyle = styled(Divider)`
	background-color: #000;
	margin-top: 0;
	margin-bottom: 15px;
	${(props) => (props.type === 'vertical' ? 'height: 425px' : '1px')};
`

type Props = {
	type?: 'horizontal' | 'vertical' | undefined;
}

export const PageDivider = ({ type }: Props) => {
	return (
		<PageDividerStyle type={type} />
	)
}