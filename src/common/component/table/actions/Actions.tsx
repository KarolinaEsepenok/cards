import React, { FC, useState } from 'react'

import edit from '../../../../assets/img/icons/edit.svg'
import teacher from '../../../../assets/img/icons/teacher.svg'
import trash from '../../../../assets/img/icons/trash.svg'
import { UpdateNamePack } from '../../../../features/packs/packCRUD/UpdateNamePack'
import { deletePackTC } from '../../../../features/packs/packsReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

type ActionsType = {
  myPack: boolean
  packId: string
  packName: string
}
export const Actions: FC<ActionsType> = ({ myPack, packId, packName }) => {
  const dispatch = useAppDispatch()
  const [openPopup, setOpenPopup] = useState(false)

  const isPackOpenHandler = () => {
    setOpenPopup(!openPopup)
  }
  const isPackDeleteHandler = () => {
    dispatch(deletePackTC(packId))
  }

  return (
    <div>
      <button>
        <img src={teacher} alt="icon teacher" />
      </button>
      {myPack && (
        <>
          <button onClick={isPackOpenHandler}>
            <img src={edit} alt="icon edit" />
          </button>
          <button onClick={isPackDeleteHandler}>
            <img src={trash} alt="icon trash" />
          </button>
        </>
      )}
      {openPopup && <UpdateNamePack openClosePopup={isPackOpenHandler} packId={packId} packName={packName} />}
    </div>
  )
}
