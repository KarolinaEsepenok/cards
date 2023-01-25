import React, { ReactNode, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import s from './Modals.module.scss'

import { Button } from 'common/components/button/Button'
import { ModalButton, ModalButtonVariantType } from 'common/components/modals/ModalsButton'
import { toggleCardModal } from 'pages/cards/cardsSlice'
import { togglePackModal } from 'pages/packs/packsSlice'

type ModalType = {
  children: ReactNode
  title: string
  isSaveDataModal: () => void
  typeBtn: ModalButtonVariantType
}

export const Modal: React.FC<ModalType> = ({ children, title, isSaveDataModal, typeBtn }) => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    // dispatch(toggleModal(false))
    dispatch(togglePackModal(false))
    dispatch(toggleCardModal(false))
  }
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        handleCloseModal()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)

    return () => document.removeEventListener('keydown', onKeydown)
  })

  return (
    <>
      <div onClick={handleCloseModal} className={s.modal}>
        <div onClick={e => e.stopPropagation()} className={s.modalContent}>
          <span onClick={handleCloseModal}>X</span>
          <h2>{title}</h2>

          {children}
          <div>
            <Button onClick={handleCloseModal} styleType={'secondary'}>
              Cancel
            </Button>
            <ModalButton isSaveDataModal={isSaveDataModal} typeBtn={typeBtn} />
          </div>
        </div>
      </div>
    </>
  )
}
