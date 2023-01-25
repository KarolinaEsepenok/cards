import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Input } from '../Input/Input'

import { Modal } from './Modal'

import { addNewCardTC } from 'pages/cards/cardsSlice'

export const AddCardModal = () => {
  const dispatch = useAppDispatch()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  let { id } = useParams()

  const handleAddCard = () => dispatch(addNewCardTC(id ? id : '', { question, answer }))
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

  return (
    <Modal title={'Add new card'} onClickSave={handleAddCard}>
      <>
        <select>
          <option value="0">Select1</option>
          <option value="1">Select2</option>
        </select>

        <Input value={question} onChange={handleChangeQuestion} type="text" label="Question" />
        <Input value={answer} onChange={handleChangeAnswer} type="text" label="Answer" />
      </>
    </Modal>
  )
}
