import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  urls: [],
  metadata: [],
}

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // Action to add images
    setImageUrls: (state, action) => {
      state.urls = action.payload
    },

    setImageMetadata: (state, action) => {
      state.metadata = action.payload
    },

    setInitialImageMetadata: (state, action) => {
      if (!state.metadata.some((obj) => obj.id === action.payload.id)) {
        state.metadata.push(action.payload)
      }
    },

    setNftMetadata: (state, action) => {
      // const index = state.nftMetadata.indexOf(action.payload)
      const updatedMetadata = state.metadata.map((data) => {
        if (data.id === action.payload.id) {
          return {
            ...data,
            ...action.payload,
          }
        }
        return data
      })
      state.metadata = updatedMetadata
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

export const {
  setImageUrls,
  setInitialImageMetadata,
  setImageMetadata,
  setNftMetadata,
} = imageSlice.actions
export const selectImagesUrls = (state) => state.images.urls
export const selectImagesMetadata = (state) => state.images.metadata
export default imageSlice.reducer
