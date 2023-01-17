import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AppThunk } from '../../common/hooks/AppThunk'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'
import { sortingPacksMethods } from '../../common/sortingPacksMethods/sortingPacksMethods'

import { AddPackType, packsApi, PackType } from './packsApi'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  queryParams: {
    pageCount: 5,
    page: 1,
    min: 0,
    max: 110,
    user_id: '',
    packName: '',
    sortPacks: sortingPacksMethods.desUpdate,
  },
}

export const getPacksTC = createAsyncThunk<void, undefined, { state: RootStateType; dispatch: AppDispatchType }>(
  'packs/getPacksTC',
  async function (_, { dispatch, getState }) {
    dispatch(setIsLoading(true))
    const { packName, sortPacks, max, min, page, pageCount, user_id } = getState().packs.queryParams

    try {
      const response = await packsApi.getPacks({
        packName: packName,
        min: min,
        max: max,
        page: page,
        pageCount: pageCount,
        sortPacks: sortPacks,
        user_id: user_id,
      })

      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount } = response.data

      dispatch(setPacksAC({ cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

export const addNewPackTC =
  (data: AddPackType): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await packsApi.addNewPack(data)

      dispatch(addNewPackAC({ pack: response.data.newCardsPack }))
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const updateNamePackTC =
  (packId: string, packName: string): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await packsApi.updatePack(packId, packName)

      dispatch(updateNamePackAC({ id: packId, packName: response.data.updatedCardsPack.name }))
      dispatch(getPacksTC())
    } catch (e) {
      if (axios.isAxiosError<{ error: string }>(e)) {
        const error = e.response ? e.response.data.error : 'Something wrong'

        dispatch(setError(error))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacksAC: (
      state,
      action: PayloadAction<{
        cardPacks: PackType[]
        cardPacksTotalCount: number
        minCardsCount: number
        maxCardsCount: number
      }>
    ) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
    },
    setMyPacks: (state, action) => {
      state.queryParams.user_id = action.payload
    },
    addNewPackAC: (state, action: PayloadAction<{ pack: PackType }>) => {
      state.cardPacks.unshift(action.payload.pack)
    },
    updateNamePackAC: (state, action: PayloadAction<{ id: string; packName: string }>) => {
      // const index = state.cardPacks.findIndex(i => i._id === action.payload.id)
      // state[index].packName = action.payload.packName
      state.cardPacks.map(p => {
        p._id === action.payload.id ? { name: action.payload.packName } : p
      })
    },
  },
})

export const packsReducer = slice.reducer
export const { setPacksAC, addNewPackAC, updateNamePackAC } = slice.actions
