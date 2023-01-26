import React, { useState } from 'react'

import s from './Modals.module.scss'

import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { Modal } from 'common/components/modals/Modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsPackName, packIdSelector } from 'common/selectors/Selectors'
import { togglePackModal, updateNamePackTC } from 'pages/packs/packsSlice'

export const EditPackNameModal = () => {
  const dispatch = useAppDispatch()
  const packIdFromState = useAppSelector(packIdSelector)
  const packNameFromState = useAppSelector(cardsPackName)

  const [nameValue, setNameValue] = useState<string>(packNameFromState)

  const handleAddPack = () => {
    dispatch(updateNamePackTC(packIdFromState, nameValue))
    // dispatch(toggleModal(false))
    dispatch(togglePackModal(false))
  }

  return (
    <Modal title={'Edit pack'} isSaveDataModal={handleAddPack} typeBtn="save">
      <Input
        autoFocus
        value={nameValue}
        onChange={e => setNameValue(e.currentTarget.value)}
        type="text"
        label="Name pack"
      />
      <Checkbox />
    </Modal>
  )
}
