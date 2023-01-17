import React, { FC } from 'react'

import edit from '../../../../assets/img/icons/edit.svg'
import teacher from '../../../../assets/img/icons/teacher.svg'
import trash from '../../../../assets/img/icons/trash.svg'

import s from './Actions.module.scss'

type ActionsType = {
  myPack: boolean
}
export const Actions: FC<ActionsType> = ({ myPack }) => {
  return (
    <>
      <button className={s.button}>
        <img src={teacher} alt="icon teacher" />
      </button>
      {myPack && (
        <>
          <button className={s.button}>
            <img src={edit} alt="icon edit" />
          </button>
          <button className={s.button}>
            <img src={trash} alt="icon trash" />
          </button>
        </>
      )}
    </>
  )
}
