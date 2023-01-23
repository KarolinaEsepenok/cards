import React, { FC, useState } from 'react'

import { UpdateNamePack } from '../updateNamePack/UpdateNamePack'

import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/component/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { deletePackTC } from 'features/packs/packsReducer'

type ActionsType = {
  myPack: boolean
  packId: string
  packName: string
}
export const PackActions: FC<ActionsType> = ({ myPack, packId, packName }) => {
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
      <Button styleType="icon">
        <img src={teacher} alt="icon teacher" title="learn" />
      </Button>
      {myPack && (
        <>
          <Button styleType="icon" onClick={handlerTogglePopup} data-tooltip="edit">
            <img src={edit} alt="icon edit" title="edit" />
          </Button>
          <Button styleType="icon">
            <img src={trash} alt="icon trash" onClick={handlerDeletePack} title="delete" />
          </Button>
        </>
      )}
      {togglePopup && <UpdateNamePack togglePopup={handlerTogglePopup} packId={packId} packName={packName} />}
    </div>
  )
}
