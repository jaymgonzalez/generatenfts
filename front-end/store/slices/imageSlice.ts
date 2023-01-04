import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  value: [],
}

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // Action to add comment
    addImage: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    // Special reducer for hydrating the state
    extraReducers: {
      // @ts-ignore
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.images,
        }
      },
    },
  },
})

export const { addImage } = imageSlice.actions
export const selectComments = (state) => state.images.value
export default imageSlice.reducer
