import { AxiosResponse } from 'axios'

import { instance } from '../../common/axiosInstance/axiosInstance'
import { sortingPacksMethods } from '../../common/constants/sortingPacksMethods/sortingPacksMethods'

export const packsApi = {
  getPacks(params: GetParamsType) {
    return instance.get<'', AxiosResponse<ResponseType>, RequestType>(`cards/pack`, { params })
  },
  addNewPack(data: AddPackType) {
    return instance.post<'', AxiosResponse<ResponseNewPack>, AddPackType>('cards/pack', data)
  },
  updatePack(packId: string, name: string) {
    return instance.put<'', AxiosResponse<ResponseUpdateNamePack>, UpdateNamePackType>('cards/pack', {
      cardsPack: { _id: packId, name },
    })
  },
  deletePack(packId: string) {
    return instance.delete<'', AxiosResponse<ResponseDeletePackType>, string>(`cards/pack?id=${packId}`)
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
export type AddPackType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}
export type UpdateNamePackType = {
  cardsPack: {
    _id: string
    name: string
  }
}

export type ResponseNewPack = {
  newCardsPack: PackType
}
export type ResponseUpdateNamePack = {
  updatedCardsPack: PackType
}
export type ResponseDeletePackType = {
  deletedCardsPack: PackType
}
