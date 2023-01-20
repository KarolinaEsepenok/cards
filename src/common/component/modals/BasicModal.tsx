import React, { ReactNode } from 'react'

import { useDispatch } from 'react-redux'

import { toggleModal } from '../../../app/appReducer'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Button } from '../button/Button'

import s from './Modals.module.scss'

type BasicModalType = {
  children: ReactNode
  title: string
}

export const BasicModal: React.FC<BasicModalType> = ({ children, title }) => {
  const toggle = useAppSelector(state => state.app.toggleModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  return (
    <>
      {toggle && (
        <div onClick={handleClose} className={s.modal}>
          <div onClick={e => e.stopPropagation()} className={s.modalContent}>
            <h2>{title}</h2>
            <div onClick={handleClose}>X</div>

            {children}

            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </div>
      )}
    </>
  )
}
