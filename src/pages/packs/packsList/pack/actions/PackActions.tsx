import React, { FC, useState } from 'react'

import s from './PackActions.module.scss'

import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { deletePackTC } from 'pages/packs/packsSlice'

type ActionsType = {
  myPack: boolean
  packId: string
  name: string
  cardsCount: number
}
export const PackActions: FC<ActionsType> = ({ myPack, packId, name, cardsCount }) => {
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
      <Button styleType="icon" disabled={!myPack && cardsCount === 0}>
        <div className={s.tooltip} data-tooltip="learn this card">
          <img src={teacher} alt="icon teacher" />
        </div>
      </Button>

      {myPack && (
        <>
          <Button styleType="icon" onClick={handlerTogglePopup}>
            <div className={s.tooltip} data-tooltip="edit name this card">
              <img src={edit} alt="icon edit" />
            </div>
          </Button>
          <Button styleType="icon" onClick={handlerDeletePack}>
            <div className={s.tooltip} data-tooltip="delete this card">
              <img src={trash} alt="icon trash" />
            </div>
          </Button>
        </>
      )}

      {togglePopup && (
        <EditPackNameModal packId={packId} setTogglePopup={setTogglePopup} togglePopup={togglePopup} name={name} />
      )}
    </div>
  )
}
