import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Button } from '../button/Button'
import { Input } from '../Input/Input'

import s from './Modals.module.scss'

import { updateCardTC } from 'features/packs/cards/cardsReducer'

type EditCardModalType = {
  setToggle: (v: any) => void
  toggle: boolean
  cardId: string
  question: string
  answer: string
}
export const EditCardModal: React.FC<EditCardModalType> = ({ setToggle, toggle, cardId, question, answer }) => {
  const dispatch = useAppDispatch()
  let { id } = useParams()

  const [questionValue, setQuestionValue] = useState<string>(question)
  const [answerValue, setAnswerValue] = useState<string>(answer)

  const handleAddPack = () =>
    dispatch(updateCardTC(id ? id : '', cardId, { question: questionValue, answer: answerValue }))

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionValue(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswerValue(e.currentTarget.value)

  return (
    <div className={s.modalContent}>
      <h2>Edit card</h2>
      <Input value={questionValue} onChange={handleChangeQuestion} type="text" label="Question" />
      <Input value={answerValue} onChange={handleChangeAnswer} type="text" label="Answer" />

      <Button onClick={handleAddPack} styleType="primary">
        Save
      </Button>
      <button onClick={() => setToggle(!toggle)}>Close</button>
    </div>
  )
}
