import React, { useState } from 'react'

import { Modal } from './Modal'
import s from './Modals.module.scss'

import { Button } from 'common/components/button/Button'
import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { updateNamePackTC } from 'pages/packs/packsSlice'

type EditPackNameModalType = {
  // packId: string
  // setTogglePopup: (v: any) => void
  // togglePopup: boolean
  // name: string
}
// export const EditPackNameModal: React.FC<EditPackNameModalType> = ({ packId, name }) => {
export const EditPackNameModal: React.FC<EditPackNameModalType> = () => {
  const dispatch = useAppDispatch()
  // const [nameValue, setNameValue] = useState<string>(name)

  // const handleAddPack = () => dispatch(updateNamePackTC(packId, nameValue))

  return (
    <h2>EditModal Pack</h2>
    // <Modal title={'Edit pack'} onClickSave={handleAddPack}>
    //   <>
    //     <Input value={nameValue} onChange={e => setNameValue(e.currentTarget.value)} type="text" label="Name pack" />
    //     <Checkbox />
    //   </>
    // </Modal>

    // <div className={s.modalContent}>
    //   <h2>Edit pack</h2>
    //   <Input value={nameValue} onChange={e => setNameValue(e.currentTarget.value)} type="text" label="Name pack" />
    //   <Checkbox />
    //   <Button onClick={handleAddPack} styleType="primary">
    //     Save
    //   </Button>
    //   <button onClick={() => setTogglePopup(!togglePopup)}>Close</button>
    // </div>
  )
}
