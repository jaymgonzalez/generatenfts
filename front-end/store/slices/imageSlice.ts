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
      const updatedMetadata = state.metadata.map((data) => {
        if (data.id === action.payload.id) {
          if (!action.payload.author) delete data.author
          if (!action.payload.description) delete data.description
          if (!action.payload.attributes) delete data.attributes
          // data.attributes = [{ trait_type: '', value: '' }]
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
