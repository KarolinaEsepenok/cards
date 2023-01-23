import React, { ReactNode } from 'react'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../hooks/useAppSelector'
import { Button } from '../button/Button'

import s from './Modals.module.scss'

import { toggleModal } from 'app/appSlice'

type BasicModalType = {
  children: ReactNode
  title: string
  onClickSave: () => void
  show: boolean
}

export const Modal: React.FC<BasicModalType> = ({ children, title, onClickSave, show }) => {
  // const toggle = useAppSelector(state => state.app.toggleModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(toggleModal(false))
  }

  const handleDispatch = () => {
    onClickSave()
    dispatch(toggleModal(false))
  }

  return (
    <>
      {show && (
        <div onClick={handleClose} className={s.modal}>
          <div onClick={e => e.stopPropagation()} className={s.modalContent}>
            <h2>{title}</h2>
            <div onClick={handleClose}>X</div>

            {children}

            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDispatch} styleType="primary">
              save
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
