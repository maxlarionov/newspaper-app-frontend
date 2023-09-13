import { Tag } from '../../types/user-types'
import { createSlice } from "@reduxjs/toolkit"
import { tagsApi } from '../../app/services/tags'
import { RootState } from "../../app/store"

interface InitialState {
	tags: Tag[] | null
}

const initialState: InitialState = {
	tags: null
}

const slice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		logout: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(tagsApi.endpoints.getAllTags.matchFulfilled, (state, action) => {
				state.tags = action.payload
			})
	}
})

export default slice.reducer

export const selectTags = (state: RootState) => state.tags