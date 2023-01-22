import React from 'react'

import { useParams } from 'react-router-dom'

import { addNewCardTC } from '../../../features/packs/cards/cardsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Input } from '../Input/Input'

import { Modal } from './Modal'

export const AddCardModal = () => {
  const dispatch = useAppDispatch()

  let { id } = useParams()

  const handleAddcard = () => dispatch(addNewCardTC(id ? id : '', { question: '01', answer: '02' }))

  return (
    <Modal title={'Add new card'} onClickSave={handleAddcard}>
      <>
        <select>
          <option value="0">Select1</option>
          <option value="1">Select2</option>
        </select>

        <Input type="text" label="Question" />
        <Input type="text" label="Answer" />
      </>
    </Modal>
  )
}
