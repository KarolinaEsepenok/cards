import React, { useState } from 'react'

import { toggleModal } from 'app/appSlice'
import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { Modal } from 'common/components/modals/Modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addNewPackTC } from 'pages/packs/packsSlice'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => {
    dispatch(addNewPackTC({ cardsPack: { name, deckCover: '', private: false } }))
    dispatch(toggleModal(false))
  }

  return (
    <Modal title={'Add new Pack'} isSaveDataModal={handleAddPack} typeBtn="save">
      <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" autoFocus />
      <Checkbox />
    </Modal>
  )
}
