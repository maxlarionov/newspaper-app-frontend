import React from 'react'
import { Article } from '../../types/user-types';
import { Form, Space } from 'antd';
import { AuthInput } from '../custom-auth-input';
import { ErrorMessage } from '../error-message';
import { OutlinedButton } from '../custom-outlined-button';
import Typography from 'antd/es/typography/Typography';

type Props<T> = {
	onFinish: (values: T) => void;
	btnText: string;
	title: string;
	error?: string;
	article?: T
}

export const ArticleShortForm = ({ onFinish, btnText, title, error, article }: Props<Article>) => {
	return (
		<>
			<Typography style={{ fontSize: '30px', margin: '20px 0px', }}>{title}</Typography>
			<Form name='article-form' onFinish={onFinish} initialValues={article}>
				<AuthInput type='text' name='title' placeholder='Title' />
				<AuthInput type='text' name='text' placeholder='Text' />
				<AuthInput type='text' name='picture' placeholder='Picture' />
				<AuthInput type='text' name='time' placeholder='Date' />
				<Space>
					<ErrorMessage message={error} />
					<OutlinedButton htmlType='submit'>
						{btnText}
					</OutlinedButton>
				</Space>
			</Form>
		</>
	)
}