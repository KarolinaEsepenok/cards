import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AddPackType, packsApi, PackType } from './packsApi'

import { setError, setIsLoading } from 'app/appReducer'
import { RootStateType } from 'app/store'
import { emptyQueryParams } from 'common/constants/emptyQueryParams/emptyQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'
import { AppThunk } from 'common/hooks/AppThunk'
import { AppDispatchType } from 'common/hooks/useAppDispatch'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  resetRange: false,
  queryParams: {
    pageCount: sessionStorage.getItem('row') ? Number(sessionStorage.getItem('row')) : 5,
    page: sessionStorage.getItem('page') ? Number(sessionStorage.getItem('page')) : 1,
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

      dispatch(setPacks({ cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount }))
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

      dispatch(addNewPack({ pack: response.data.newCardsPack }))
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

      dispatch(updateNamePack({ id: packId, packName: response.data.updatedCardsPack.name }))
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

export const deletePackTC =
  (packId: string): AppThunk =>
  async dispatch => {
    dispatch(setIsLoading(true))
    try {
      await packsApi.deletePack(packId)
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
    setPacks: (
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
    setMyPacks: (state, action: PayloadAction<string | null>) => {
      if (action.payload !== null) state.queryParams.user_id = action.payload
    },
    setRangeValues: (state, action: PayloadAction<number[]>) => {
      state.queryParams.min = action.payload[0]
      state.queryParams.max = action.payload[1]
    },
    setPacksCurrentPage: (state, action) => {
      state.queryParams.page = action.payload
    },
    setRowPage: (state, action) => {
      state.queryParams.pageCount = action.payload
    },
    addNewPack: (state, action: PayloadAction<{ pack: PackType }>) => {
      state.cardPacks.unshift(action.payload.pack)
    },
    updateNamePack: (state, action: PayloadAction<{ id: string; packName: string }>) => {
      state.cardPacks.forEach(p => {
        if (p._id === action.payload.id) {
          p.name = action.payload.packName
        }
      })
    },
    resetAllFilters: state => {
      state.queryParams = { ...emptyQueryParams }
      state.resetRange = !state.resetRange
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.queryParams.packName = action.payload
    },
  },
})

export const packsReducer = slice.reducer
export const {
  setPacks,
  setRangeValues,
  setMyPacks,
  setPacksCurrentPage,
  setRowPage,
  addNewPack,
  updateNamePack,
  resetAllFilters,
  setSearchName,
} = slice.actions
