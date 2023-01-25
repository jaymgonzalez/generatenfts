import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  ownedNfts: [],
}

export const nftSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNftData: (state, action) => {
      state.ownedNfts = action.payload
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

export const { setNftData } = nftSlice.actions
export const selectNftData = (state) => state.nfts.ownedNfts
export default nftSlice.reducer
