import React from 'react'

import { Button } from 'common/components/button/Button'
// @ts-ignore
import s from 'common/components/modals/Modals.module.scss'

type ModalButtonType = {
  isSaveDataModal: () => void
  typeBtn: ModalButtonVariantType
}
export const ModalButton: React.FC<ModalButtonType> = ({ isSaveDataModal, typeBtn }) => {
  return (
    <div>
      {typeBtn === 'save' && (
        <Button className={s.modalBtn} onClick={isSaveDataModal} styleType="primary">
          Save
        </Button>
      )}
      {typeBtn === 'delete' && (
        <Button className={s.modalBtn} onClick={isSaveDataModal} styleType="warn">
          Delete
        </Button>
      )}
    </div>
  )
}

export type ModalButtonVariantType = 'delete' | 'save'
