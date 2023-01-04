import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { imageSlice } from './slices/imageSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [imageSlice.name]: imageSlice.reducer,
    },
    devTools: true,
  })

export const wrapper = createWrapper(makeStore)
