import React, { ReactNode } from 'react'

import { useDispatch } from 'react-redux'

import s from './Modals.module.scss'

import { toggleModal } from 'app/appSlice'
import { ModalButton } from 'common/components/modals/ModalsButton'

type ModalType = {
  children: ReactNode
  title: string
  isSaveDataModal: () => void
  typeBtn: string
}

export const Modal: React.FC<ModalType> = ({ children, title, isSaveDataModal }) => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(toggleModal(false))
  }

  return (
    <>
      <div onClick={handleCloseModal} className={s.modal}>
        <div onClick={e => e.stopPropagation()} className={s.modalContent}>
          <span onClick={handleCloseModal}>X</span>
          <h2>{title}</h2>

          {children}

          <ModalButton isCloseModal={handleCloseModal} isSaveDataModal={isSaveDataModal} />
        </div>
      </div>
    </>
  )
}
