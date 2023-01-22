import React from 'react'

import { addNewPackTC } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import { Modal } from './Modal'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()

  const handleAddPack = () => dispatch(addNewPackTC({ cardsPack: { name: 'NewPack', deckCover: '', private: false } }))

  return (
    <Modal title={'Add new pack'} onClickSave={handleAddPack}>
      <>
        <Input type="text" label="Name pack" />
        <Checkbox />
      </>
    </Modal>
  )
}
