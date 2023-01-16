import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'

export const packsApi = {
  getPacks() {
    return instance.get<'', AxiosResponse<ResponseSearchType>>('cards/pack')
  },
  search(packName: string) {
    return instance.get<'', AxiosResponse<ResponseSearchType>, RequestSearchType>(`cards/pack?packName=${packName}`)
  },
  // getMyPacks(myPacks: boolean) {
  //  return instance.
  //}
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
export type ResponseSearchType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
export type RequestSearchType = {
  packName: string
}
