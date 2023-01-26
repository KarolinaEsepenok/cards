import React, { useState } from 'react'

import { Modal } from './Modal'
import s from './Modals.module.scss'

import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addNewPackTC, togglePackModal } from 'pages/packs/packsSlice'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => {
    dispatch(addNewPackTC({ cardsPack: { name, deckCover: '', private: false } }))
    dispatch(togglePackModal(false))
  }

  return (
    <Modal title={'Add new Pack'} isSaveDataModal={handleAddPack} typeBtn="save">
      <Input
        value={name}
        onChange={e => setName(e.currentTarget.value)}
        type="text"
        label="Name pack"
        autoFocus
        className={s.input}
      />
      <Checkbox />
    </Modal>
  )
}
