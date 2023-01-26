import React, { useEffect } from 'react'

import { Button } from 'common/components/button/Button'
import s from 'common/components/modals/Modals.module.scss'

type ModalButtonType = {
  isSaveDataModal: () => void
  typeBtn: ModalButtonVariantType
  value: string
}
export const ModalButton: React.FC<ModalButtonType> = ({ isSaveDataModal, typeBtn, value }) => {
  if (typeBtn === 'save') {
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
  }

  return (
    <div>
      {typeBtn === 'save' && (
        <Button disabled={!value.length} className={s.modalBtn} onClick={isSaveDataModal} styleType="primary">
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
