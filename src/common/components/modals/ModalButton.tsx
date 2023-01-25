import React from 'react'

import { Button } from 'common/components/button/Button'

type ModalButtonType = {
  isCloseModal: () => void
  isSaveDataModal: () => void
}
export const ModalButton: React.FC<ModalButtonType> = ({ isCloseModal, isSaveDataModal }) => {
  return (
    <div>
      <Button onClick={isCloseModal} styleType={'secondary'}>
        Cancel
      </Button>
      <Button onClick={isSaveDataModal} styleType="primary">
        Save
      </Button>
    </div>
  )
}

type ModalButtonVariantType = 'delete' | 'save'
