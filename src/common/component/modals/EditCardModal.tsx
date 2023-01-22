import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { updateCardTC } from '../../../features/packs/cards/cardsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Button } from '../button/Button'
import { Input } from '../Input/Input'

import s from './Modals.module.scss'

type EditCardModalType = {
  setToggle: (v: any) => void
  toggle: boolean
  cardId: string
}
export const EditCardModal: React.FC<EditCardModalType> = ({ setToggle, toggle, cardId }) => {
  const dispatch = useAppDispatch()
  let { id } = useParams()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const handleAddPack = () => dispatch(updateCardTC(id ? id : '', cardId, { question, answer }))

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

  return (
    <div className={s.modalContent}>
      <h2>Edit card</h2>
      <Input value={question} onChange={handleChangeQuestion} type="text" label="Question" />
      <Input value={answer} onChange={handleChangeAnswer} type="text" label="Answer" />

      <Button onClick={handleAddPack} styleType="primary">
        Save
      </Button>
      <button onClick={() => setToggle(!toggle)}>Close</button>
    </div>
  )
}
