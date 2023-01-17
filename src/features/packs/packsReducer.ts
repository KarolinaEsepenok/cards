import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setError, setIsLoading } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AppDispatchType } from '../../common/hooks/useAppDispatch'
import { sortingPacksMethods } from '../../common/sortingPacksMethods/sortingPacksMethods'

import { packsApi, PackType } from './packsApi'

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

      setPacksAC({ cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount })
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
  },
})


export const packsReducer = slice.reducer
export const { setPacksAC } = slice.actions


