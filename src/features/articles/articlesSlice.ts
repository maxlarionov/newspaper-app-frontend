import { Article } from '../../types/user-types'
import { createSlice } from "@reduxjs/toolkit"
import { articlesApi } from '../../app/services/articles'
import { RootState } from "../../app/store"

interface InitialState {
	employees: Article[] | null
}

const initialState: InitialState = {
	employees: null
}

const slice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		logout: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(articlesApi.endpoints.getAllArticles.matchFulfilled, (state, action) => {
				state.employees = action.payload
			})
	}
})

export default slice.reducer

export const selectEmployees = (state: RootState) => state.articles