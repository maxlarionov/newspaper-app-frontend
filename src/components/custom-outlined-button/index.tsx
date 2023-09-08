import { Button, Form } from 'antd'
import { styled } from 'styled-components'

const CustomButton = styled(Button)`
	border-radius: 20px;
	border: 1px solid #000;

	&:hover {
		color: #69b1ff;
	}
`

type Props = {
	children: React.ReactNode;
	htmlType?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
	danger?: boolean;
	loading?: boolean;
	shape?: "default" | "circle" | "round" | undefined;
	icon?: React.ReactNode;
}

export const OutlinedButton = ({ children, htmlType = 'button', onClick, type, danger, loading, shape, icon }: Props) => {
	return (
		<Form.Item style={{ margin: 0, }}>
			<CustomButton
				htmlType={htmlType}
				type={type}
				onClick={onClick}
				danger={danger}
				loading={loading}
				shape={shape}
				icon={icon}
			>{children}</CustomButton>
		</Form.Item>
	)
}