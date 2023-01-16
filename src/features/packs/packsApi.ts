import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'

export const packsApi = {
  getPacks() {
    return instance.get<'', AxiosResponse<ResponseType>>('cards/pack')
  },
  search(packName: string) {
    return instance.get<'', AxiosResponse<ResponseType>, RequestSearchType>(`cards/pack?packName=${packName}`)
  },
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

export type ResponseType = {
  cardPacks: PackType[]

  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
}

export type RequestSearchType = {
  packName: string
}
