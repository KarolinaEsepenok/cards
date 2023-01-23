import { instance } from 'common/axiosInstance/axiosInstance'
import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'

export const cardsAPI = {
  getCards(params: GetParamsCardType) {
    return instance.get<ResponseGetType>('cards/card', { params })
  },
}

//type
export type GetParamsCardType = {
  cardsPack_id: string
  pageCount: number
  cardQuestion: string
  page: number
  sortCards: sortingCardsMethods
}
export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
export type ResponseGetType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type RequestCardsType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: string
  page: number
  pageCount: number
}
