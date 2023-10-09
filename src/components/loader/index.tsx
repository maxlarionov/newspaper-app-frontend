import { Spin } from 'antd'

type Props = {}

export const Loader = (props: Props) => {
	return (
		<Spin tip="Loading" size="large" style={{ marginTop: '200px' }}>
			<div className="content" />
		</Spin>
	)
}