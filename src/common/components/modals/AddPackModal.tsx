import React, { useState } from 'react'

import { Modal } from './Modal'

import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addNewPackTC } from 'pages/packs/packsSlice'

type AddPackModalType = {
  show: boolean
}
export const AddPackModal: React.FC<AddPackModalType> = ({ show }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => dispatch(addNewPackTC({ cardsPack: { name, deckCover: '', private: false } }))

  return (
    <Modal title={'Add new pack'} onClickSave={handleAddPack} show={show}>
      <>
        <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
        <Checkbox />
      </>
    </Modal>
  )
}
