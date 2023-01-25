import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { imageSlice } from './slices/imageSlice'
import { nftSlice } from './slices/nftSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [imageSlice.name]: imageSlice.reducer,
      [nftSlice.name]: nftSlice.reducer,
    },
    devTools: true,
  })

export const wrapper = createWrapper(makeStore)
