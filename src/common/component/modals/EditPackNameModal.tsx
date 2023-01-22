import React, { useState } from 'react'

import { updateNamePackTC } from '../../../features/packs/packsReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Button } from '../button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import s from './Modals.module.scss'

type EditPackNameModalType = {
  packId: string
  setTogglePopup: (v: any) => void
  togglePopup: boolean
}
export const EditPackNameModal: React.FC<EditPackNameModalType> = ({ packId, setTogglePopup, togglePopup }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const handleAddPack = () => dispatch(updateNamePackTC(packId, name))

  return (
    // <Modal title={'Edit pack'} onClickSave={handleAddPack}>
    //   <>
    //     <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
    //     <Checkbox />
    //   </>
    // </Modal>
    <div className={s.modalContent}>
      <h2>Edit pack</h2>
      <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
      <Checkbox />
      <Button onClick={handleAddPack} styleType="primary">
        Save
      </Button>
      <button onClick={() => setTogglePopup(!togglePopup)}>Close</button>
    </div>
  )
}
