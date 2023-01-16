import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'
import { sortingPacksMethods } from '../../common/sortingPacksMethods/sortingPacksMethods'

export const packsApi = {

  getPacks(params: GetParamsType) {
    return instance.get<'', AxiosResponse<ResponseType>, RequestType>(`cards/pack`, { params: { ...params } })

  },
  // getMyPacks(myPacks: boolean) {
  //  return instance.
  //}
}

//types
export type PackType = {
  _id: string
  user_id: string
  user_name: string
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
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
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
