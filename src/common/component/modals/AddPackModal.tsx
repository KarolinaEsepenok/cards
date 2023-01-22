import React, { useState } from 'react'

import { addNewPackTC } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import { Modal } from './Modal'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => dispatch(addNewPackTC({ cardsPack: { name, deckCover: '', private: false } }))

  return (
    <Modal title={'Add new pack'} onClickSave={handleAddPack}>
      <>
        <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
        <Checkbox />
      </>
    </Modal>
  )
}
