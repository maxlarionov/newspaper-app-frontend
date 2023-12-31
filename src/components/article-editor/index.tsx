import { useCallback, useState, useMemo, useRef, ChangeEvent } from 'react'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Input, Space } from 'antd'
import styled from 'styled-components'
import { OutlinedButton } from '../custom-outlined-button'
import { useAddImageMutation, useRemoveImageMutation } from '../../app/services/uploads'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ArticleData } from '../../app/services/articles'
import { ErrorMessage } from '../error-message'

const { TextArea } = Input

const ArticleForm = styled.div`
	& > *{
		margin-bottom: 10px;
	}
`
const TitleInput = styled(TextArea)`
	margin: 20px 0px;
	color: #000;
	font-family: Roboto Slab;
	font-size: 50px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	@media (max-width: 740px) {
		font-size: 42px;
	}

	@media (max-width: 680px) {
		font-size: 36px;
	}
`
const ImageContainer = styled(Space)`
	@media (max-width: 480px) {
		display: flex;
		flex-direction: column;
	}
`
const PreviewImage = styled.div`
	width: 216px;
	height: 100px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #636363;
`

type Props<T> = {
	onFinish: (values: T) => void;
	article?: T;
	error?: string
}

export const ArticleEditor = ({ article, onFinish, error }: Props<ArticleData>) => {
	const [addImage] = useAddImageMutation()
	const [removeImage] = useRemoveImageMutation()
	const [errorImage, setErrorImage] = useState('')
	const [title, setTitle] = useState(article?.title || '')
	const [text, setText] = useState(article?.text || '')
	const [time, setTime] = useState(article?.time || '')
	const [imagePreview, setImagePreview] = useState(article?.picture || '')
	const inputFileRef = useRef<HTMLInputElement | null>(null)


	const onChange = useCallback((value: string) => {
		setText(value);
	}, []);

	const editorOptions = useMemo(() => ({
		spellChecker: false,
		maxHeight: '500px',
		autofocus: true,
		placeholder: 'Start writing your text...',
		status: false,
		autosave: {
			enabled: true,
			delay: 1000,
			uniqueId: 'autosaveText'
		}
	}), [])

	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		try {

			if (e.target.files == null) {
				return setErrorImage('Empty input')
			}
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			await addImage(formData).unwrap()

			setImagePreview(file.name)
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setErrorImage(err.data.message)
			} else {
				setErrorImage('Unknown error')
			}
		}
	}

	const deleteImage = async () => {
		try {
			if (imagePreview !== undefined) {
				console.log(`${imagePreview}`)

				await removeImage(imagePreview)
				setImagePreview('')
			}
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setErrorImage(err.data.message)
			} else {
				setErrorImage('Unknown error')
			}
		}
	}

	return (
		<ArticleForm>
			<TitleInput
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder={'Write title'}
				bordered={false}
				maxLength={100}
				autoSize
			/>
			<SimpleMDE
				value={text}
				onChange={onChange}
				options={editorOptions}
			/>
			<Input
				value={time}
				size='large'
				placeholder={'Write publishing time'}
				onChange={(event) => setTime(event.target.value)}
				style={{ display: 'block', maxWidth: '300px' }}
			/>
			<ImageContainer>
				<OutlinedButton onClick={() => inputFileRef.current !== null ? inputFileRef.current.click() : null}>Upload image</OutlinedButton>
				<input ref={inputFileRef} type='file' onChange={handleChangeImage} name='image' accept='.jpg, .jpeg, .png .webp' style={{ color: 'black' }} hidden />
				{imagePreview && (
					<>
						<PreviewImage style={{ backgroundImage: `url(https://newspaper-app-backend.onrender.com/api/uploads/${imagePreview})` }} />
						<OutlinedButton onClick={deleteImage} danger>Delete</OutlinedButton>
					</>
				)}
			</ImageContainer>
			<OutlinedButton type='primary' onClick={() => onFinish({ title, text, picture: imagePreview, time })} htmlType='submit'>Pablish the article</OutlinedButton>
			<ErrorMessage message={error} />
			<ErrorMessage message={errorImage} />
		</ArticleForm>
	)
}