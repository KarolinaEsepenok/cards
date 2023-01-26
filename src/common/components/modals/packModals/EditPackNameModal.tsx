import React, { useState } from 'react'

import { Checkbox } from 'common/components/checkbox/Checkbox'
import { Input } from 'common/components/Input/Input'
import { Modal } from 'common/components/modals/Modal'
import s from 'common/components/modals/Modals.module.scss'
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
    dispatch(togglePackModal(false))
  }

  return (
    <Modal title={'Edit pack'} isSaveDataModal={handleAddPack} typeBtn="save" value={nameValue}>
      <Input
        autoFocus
        value={nameValue}
        onChange={e => setNameValue(e.currentTarget.value)}
        className={!nameValue.length ? s.inputError : s.input}
        type="text"
        label="Name pack"
      />
      <Checkbox />
    </Modal>
  )
}
