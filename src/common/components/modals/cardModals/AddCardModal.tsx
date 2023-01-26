import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { Input } from 'common/components/Input/Input'
import { Modal } from 'common/components/modals/Modal'
import s from 'common/components/modals/Modals.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addNewCardTC, toggleCardModal } from 'pages/cards/cardsSlice'

export const AddCardModal = () => {
  const dispatch = useAppDispatch()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  let { id } = useParams()

  const handleAddCard = () => {
    dispatch(addNewCardTC(id ? id : '', { question, answer }))
    dispatch(toggleCardModal(false))
  }
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

  return (
    <Modal title={'Add new card'} isSaveDataModal={handleAddCard} typeBtn="save">
      <select>
        <option value="0">Text</option>
        <option value="1">Select2</option>
      </select>

      <Input
        value={question}
        onChange={handleChangeQuestion}
        type="text"
        label="Question"
        autoFocus
        className={s.input}
      />
      <Input value={answer} onChange={handleChangeAnswer} type="text" label="Answer" className={s.input} />
    </Modal>
  )
}
