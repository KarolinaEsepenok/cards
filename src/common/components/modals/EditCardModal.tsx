import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Input } from '../Input/Input'

import { Modal } from './Modal'
import s from './Modals.module.scss'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { toggleCardModal, updateCardTC } from 'pages/cards/cardsSlice'

export const EditCardModal = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams()
  const cardId = useAppSelector(state => state.cards.cards[0]._id)
  const question = useAppSelector(state => state.cards.cards[0].question)
  const answer = useAppSelector(state => state.cards.cards[0].answer)

  const [questionValue, setQuestionValue] = useState<string>(question)
  const [answerValue, setAnswerValue] = useState<string>(answer)

  const handleEditPack = () => {
    dispatch(updateCardTC(id ? id : '', cardId, { question: questionValue, answer: answerValue }))
    // dispatch(toggleModal(false))
    dispatch(toggleCardModal(false))
  }

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionValue(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswerValue(e.currentTarget.value)

  return (
    <Modal title={'Edit card'} isSaveDataModal={handleEditPack} typeBtn="save">
      <Input autoFocus value={questionValue} onChange={handleChangeQuestion} type="text" label="Question" />
      <Input value={answerValue} onChange={handleChangeAnswer} type="text" label="Answer" />
    </Modal>
  )
}
