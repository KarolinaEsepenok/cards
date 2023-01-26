import React, { ReactNode, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import closeBtn from 'assets/img/icons/closeBtn.svg'
import { Button } from 'common/components/button/Button'
import s from 'common/components/modals/Modals.module.scss'
import { ModalButton, ModalButtonVariantType } from 'common/components/modals/ModalsButton'
import { toggleCardModal } from 'pages/cards/cardsSlice'
import { togglePackModal } from 'pages/packs/packsSlice'

type ModalType = {
  children: ReactNode
  title: string
  isSaveDataModal: () => void
  typeBtn: ModalButtonVariantType
  value: string
}

export const Modal: React.FC<ModalType> = ({ children, title, isSaveDataModal, typeBtn, value }) => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
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
          <div className={s.modalTitleContainer}>
            <h2 className={s.modalTitle}>{title}</h2>
            <div className={s.modalClose}>
              <img src={closeBtn} onClick={handleCloseModal} alt="closeButton" />
            </div>
          </div>

          {children}

          <div className={s.modalButtons}>
            <Button className={s.modalBtn} onClick={handleCloseModal} styleType={'secondary'}>
              Cancel
            </Button>
            <ModalButton isSaveDataModal={isSaveDataModal} typeBtn={typeBtn} value={value} />
          </div>
        </div>
      </div>
    </>
  )
}
