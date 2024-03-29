import { AxiosResponse } from 'axios'

import { instance } from 'common/axiosInstance/axiosInstance'
import { sortingCardsMethods } from 'common/constants/sortingPacksMethods/sortingMethods'

export const cardsAPI = {
  getCards(params: GetParamsCardType) {
    return instance.get<ResponseGetType>('cards/card', { params })
  },
  addNewCard(packId: string, newCard: AddNewCardParamType) {
    return instance.post<'', AxiosResponse<ResponseNewCardType>, RequestNewCardType>('cards/card', {
      card: { cardsPack_id: packId, ...newCard },
    })
  },
  updateCard(cardId: string, editCard: AddNewCardParamType) {
    return instance.put<'', AxiosResponse<ResponseUpdateCardType>, RequestUpdateCardType>('cards/card', {
      card: {
        _id: cardId,
        question: editCard.question,
        answer: editCard.answer,
      },
    })
  },
  updateCardGrade(cardId: string, grade: number) {
    return instance.put<'', AxiosResponse<ResponseUpdateCardGrade>, RequestUpdateCardGrade>('cards/grade', {
      card_id: cardId,
      grade,
    })
  },
  deleteCard(cardId: string) {
    return instance.delete<DeleteCardType>(`cards/card?id=${cardId}`)
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
  packName: string
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

export type RequestNewCardType = {
  card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}

export type AddNewCardParamType = {
  question: string
  answer: string
}

export type ResponseNewCardType = {
  newCard: CardType
}

export type DeleteCardType = {
  deletedCard: CardType
}

export type ResponseUpdateCardType = {
  updatedCard: CardType
}

export type RequestUpdateCardGrade = {
  grade: number
  card_id: string
}

export type ResponseUpdateCardGrade = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}

export type RequestUpdateCardType = {
  card: {
    _id: string
    question: string
    answer: string
  }
}
