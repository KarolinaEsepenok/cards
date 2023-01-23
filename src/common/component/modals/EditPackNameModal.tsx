import React, { useState } from 'react'

import s from './Modals.module.scss'

import { Button } from 'common/component/button/Button'
import { Checkbox } from 'common/component/checkbox/Checkbox'
import { Input } from 'common/component/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { updateNamePackTC } from 'features/packs/packsReducer'

type EditPackNameModalType = {
  packId: string
  setTogglePopup: (v: any) => void
  togglePopup: boolean
  name: string
}
export const EditPackNameModal: React.FC<EditPackNameModalType> = ({ packId, setTogglePopup, togglePopup, name }) => {
  const dispatch = useAppDispatch()
  const [nameValue, setNameValue] = useState<string>(name)

  const handleAddPack = () => dispatch(updateNamePackTC(packId, nameValue))

  return (
    // <Modal title={'Edit pack'} onClickSave={handleAddPack}>
    //   <>
    //     <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" label="Name pack" />
    //     <Checkbox />
    //   </>
    // </Modal>
    <div className={s.modalContent}>
      <h2>Edit pack</h2>
      <Input value={nameValue} onChange={e => setNameValue(e.currentTarget.value)} type="text" label="Name pack" />
      <Checkbox />
      <Button onClick={handleAddPack} styleType="primary">
        Save
      </Button>
      <button onClick={() => setTogglePopup(!togglePopup)}>Close</button>
    </div>
  )
}
