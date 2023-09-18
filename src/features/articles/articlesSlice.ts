import { Article } from '../../types/user-types'
import { createSlice } from "@reduxjs/toolkit"
import { articlesApi } from '../../app/services/articles'
import { RootState } from "../../app/store"

interface InitialState {
	articles: Article[] | null
}

const initialState: InitialState = {
	articles: null
}

const slice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		logout: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(articlesApi.endpoints.getAllArticles.matchFulfilled, (state, action) => {
				state.articles = action.payload
			})
	}
})

export default slice.reducer

export const selectArticles = (state: RootState) => state.articles