import React, { FC, useState } from 'react'

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
}
export const PackActions: FC<ActionsType> = ({ myPack, packId, name }) => {
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
          <Button styleType="icon" onClick={handlerDeletePack}>
            <img src={trash} alt="icon trash" />
          </Button>
        </>
      )}

      {togglePopup && (
        <EditPackNameModal packId={packId} setTogglePopup={setTogglePopup} togglePopup={togglePopup} name={name} />
      )}
    </div>
  )
}
