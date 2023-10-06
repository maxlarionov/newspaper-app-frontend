import { Spin } from "antd"
import { useCurrentQuery } from "../../app/services/user"

export const Auth = ({ children }: { children: JSX.Element }) => {
	const { isLoading } = useCurrentQuery()

	if (isLoading) {
		return (<Spin tip="Loading" size="large" style={{ marginTop: '200px' }}>
			<div className="content" />
		</Spin>)
	}

	return children
}
