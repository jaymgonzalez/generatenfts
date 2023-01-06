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
          if (!action.payload.author) delete action.payload.author
          if (action.payload.attributes[0]?.value === '')
            delete action.payload.attributes
          if (!data.description) delete action.payload.description
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
