import React, { useEffect } from 'react'

import { Button } from 'common/components/button/Button'
// @ts-ignore
import s from 'common/components/modals/Modals.module.scss'

type ModalButtonType = {
  isSaveDataModal: () => void
  typeBtn: ModalButtonVariantType
}
export const ModalButton: React.FC<ModalButtonType> = ({ isSaveDataModal, typeBtn }) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Enter':
        isSaveDataModal()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)

    return () => document.removeEventListener('keydown', onKeydown)
  })

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
