import React, { FC } from 'react'

import { toggleModal } from 'app/appSlice'
import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { DeletePackModal } from 'common/components/modals/DeletePackModal'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setPackId, setPackName } from 'pages/cards/cardsSlice'
import { setModalContent } from 'pages/packs/packsSlice'

type ActionsType = {
  myPack: boolean
  packId: string
  name: string
}
export const PackActions: FC<ActionsType> = ({ myPack, packId, name }) => {
  const dispatch = useAppDispatch()
  const modalContent = useAppSelector(state => state.packs.modalNode)
  const toggleModalFromState = useAppSelector(state => state.app.toggleModal)

  const handlerTogglePopup = () => {
    dispatch(toggleModal(true))
    dispatch(setModalContent('editPackName'))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
  }

  const handlerDeletePack = () => {
    dispatch(setModalContent('deletePack'))
    dispatch(toggleModal(true))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
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
          {toggleModalFromState && modalContent === 'editPackName' && <EditPackNameModal />}

          <Button styleType="icon" onClick={handlerDeletePack}>
            <img src={trash} alt="icon trash" />
          </Button>
          {toggleModalFromState && modalContent === 'deletePack' && <DeletePackModal />}
        </>
      )}
    </div>
  )
}
