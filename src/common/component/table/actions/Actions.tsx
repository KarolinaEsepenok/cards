import React, { FC, useState } from 'react'

import edit from '../../../../assets/img/icons/edit.svg'
import teacher from '../../../../assets/img/icons/teacher.svg'
import trash from '../../../../assets/img/icons/trash.svg'
import { UpdateNamePack } from '../../../../features/packs/packsList/pack/updateNamePack/UpdateNamePack'
import { deletePackTC } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

import s from './Actions.module.scss'

type ActionsType = {
  myPack: boolean
  packId: string
  packName: string
}
export const Actions: FC<ActionsType> = ({ myPack, packId, packName }) => {
  const dispatch = useAppDispatch()
  const [togglePopup, setTogglePopup] = useState(false)

  const handlerTogglePopup = () => {
    setTogglePopup(!togglePopup)
  }
  const handlerDeletePack = () => {
    dispatch(deletePackTC(packId))
  }

  return (
    <div>
      <button className={s.button}>
        <img src={teacher} alt="icon teacher" />
      </button>
      {myPack && (
        <>
          <button className={s.button} onClick={handlerTogglePopup}>
            <img src={edit} alt="icon edit" />
          </button>
          <button className={s.button} onClick={handlerDeletePack}>
            <img src={trash} alt="icon trash" />
          </button>
        </>
      )}
      {togglePopup && <UpdateNamePack togglePopup={handlerTogglePopup} packId={packId} packName={packName} />}
    </div>
  )
}
