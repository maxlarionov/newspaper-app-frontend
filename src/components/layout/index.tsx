import { Layout as AntLayout } from 'antd'
import { Header } from '../header'
import { styled } from 'styled-components';
import { Footer } from '../footer';

const Body = styled(AntLayout.Content)`
	max-width: 1020px;
	height: 100%;
	margin: 0 auto;
	padding-top: 80px;
`

type Props = {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<Body>
				{children}
			</Body>
			<Footer />
		</>
	)
}
