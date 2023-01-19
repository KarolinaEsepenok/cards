import React, { FC, useState } from 'react'

import edit from '../../../../assets/img/icons/edit.svg'
import teacher from '../../../../assets/img/icons/teacher.svg'
import trash from '../../../../assets/img/icons/trash.svg'
import { UpdateNamePack } from '../../../../features/packs/packsList/pack/updateNamePack/UpdateNamePack'
import { deletePackTC } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { Button } from '../../button/Button'

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
      <Button styleType="icon">
        <img src={teacher} alt="icon teacher" />
      </Button>
      {myPack && (
        <>
          <Button styleType="icon" onClick={handlerTogglePopup}>
            <img src={edit} alt="icon edit" />
          </Button>
          <Button styleType="icon">
            <img src={trash} alt="icon trash" onClick={handlerDeletePack} />
          </Button>
        </>
      )}
      {togglePopup && <UpdateNamePack togglePopup={handlerTogglePopup} packId={packId} packName={packName} />}
    </div>
  )
}
