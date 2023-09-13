import { Button, Result, Row } from "antd"
import { Link, useParams } from "react-router-dom"

const Statuses: Record<string, string> = {
	created: 'Article created',
	updated: 'Article edited',
	deleted: 'Article deleted',
}

export const Status = () => {
	const { status } = useParams()

	return (
		<Row align='middle' justify='center' style={{ width: '100%' }}>
			<Result
				status={status ? 'success' : '404'}
				title={status ? Statuses[status] : 'Not found'}
				extra={
					<Button key='dashboard'>
						<Link to={'/'}>To main page</Link>
					</Button>
				}
			/>
		</Row>
	)
}
