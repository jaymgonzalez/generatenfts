import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  value: {
    urls: [],
    metadata: [],
    nftMetadata: [],
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

    setNftMetadata: (state, action) => {
      state.value.nftMetadata = action.payload
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

export const { setImageUrls, setImageMetadata, setNftMetadata } =
  imageSlice.actions
export const selectImagesUrls = (state) => state.images.value.urls
export const selectImagesMetadata = (state) => state.images.value.metadata
export const selectNftMetadata = (state) => state.images.value.nftMetadata

export default imageSlice.reducer
