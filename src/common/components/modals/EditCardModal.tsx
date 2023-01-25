import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Button } from '../button/Button'
import { Input } from '../Input/Input'

import s from './Modals.module.scss'

import { toggleModal } from 'app/appSlice'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { updateCardTC } from 'pages/cards/cardsSlice'

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
    dispatch(toggleModal(false))
  }

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionValue(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswerValue(e.currentTarget.value)

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>Edit card</h2>
        <Input autoFocus value={questionValue} onChange={handleChangeQuestion} type="text" label="Question" />
        <Input value={answerValue} onChange={handleChangeAnswer} type="text" label="Answer" />

        <Button onClick={handleClose} styleType="secondary">
          Cancel
        </Button>
        <Button onClick={handleEditPack} styleType="primary">
          Save
        </Button>
      </div>
    </div>
  )
}
