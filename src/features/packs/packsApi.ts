import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'
import { sortingPacksMethods } from '../../common/sortingPacksMethods/sortingPacksMethods'

export const packsApi = {
  getPacks(params: GetParamsType) {
    return instance.get<'', AxiosResponse<ResponseType>, RequestType>(`cards/pack`, { params: { ...params } })
  },
}
//types
export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
export type GetParamsType = {
  page: number
  pageCount: number
  packName: string
  user_id: string
  min: number
  max: number
  sortPacks: sortingPacksMethods
}
export type ResponseType = {
  cardPacks: PackType[]

  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
export type RequestType = {
  page: number
  pageCount: number
  packName: string
  user_id: string
  min: number
  max: number
  sortPacks: sortingPacksMethods
}
