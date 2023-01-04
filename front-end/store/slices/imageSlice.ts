import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  value: {
    urls: [],
    metadata: [],
  },
}

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // Action to add images
    setImageUrls: (state, action) => {
      state.value.urls = action.payload
    },

    setImageMetadata: (state, action) => {
      state.value.metadata = action.payload
    },

    // Special reducer for hydrating the state
    // extraReducers: {
    //   // @ts-ignore
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.images,
    //     }
    //   },
    // },
  },
})

export const { setImageUrls, setImageMetadata } = imageSlice.actions
export const selectImagesUrls = (state) => state.images.value.urls
export const selectImagesMetadata = (state) => state.images.value.metadata

export default imageSlice.reducer
