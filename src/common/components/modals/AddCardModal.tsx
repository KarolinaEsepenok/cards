import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'

import { toggleModal } from 'app/appSlice'
import { Button } from 'common/components/button/Button'
import { Input } from 'common/components/Input/Input'
import s from 'common/components/modals/Modals.module.scss'
import { addNewCardTC } from 'pages/cards/cardsSlice'

export const AddCardModal = () => {
  const dispatch = useAppDispatch()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  let { id } = useParams()

  const handleAddCard = () => {
    dispatch(addNewCardTC(id ? id : '', { question, answer }))
    dispatch(toggleModal(false))
  }
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)
  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <div onClick={handleClose} className={s.modal}>
      <div onClick={e => e.stopPropagation()} className={s.modalContent}>
        <span onClick={handleClose}>X</span>
        <h2>Add new card</h2>

        <select>
          <option value="0">Text</option>
          <option value="1">Select2</option>
        </select>

        <Input value={question} onChange={handleChangeQuestion} type="text" label="Question" autoFocus />
        <Input value={answer} onChange={handleChangeAnswer} type="text" label="Answer" />

        <Button onClick={handleClose} styleType="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddCard} styleType="primary">
          Save
        </Button>
      </div>
    </div>
  )
}
