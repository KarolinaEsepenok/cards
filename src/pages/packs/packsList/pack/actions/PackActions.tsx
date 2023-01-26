import React, { FC } from 'react'

import s from './PackActions.module.scss'

import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { DeletePackModal } from 'common/components/modals/DeletePackModal'
import { EditPackNameModal } from 'common/components/modals/EditPackNameModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { modalContentSelector } from 'common/selectors/Selectors'
import { setPackId, setPackName } from 'pages/cards/cardsSlice'
import { setModalContent, togglePackModal } from 'pages/packs/packsSlice'

type ActionsType = {
  myPack: boolean
  packId: string
  name: string
  cardsCount: number
}
export const PackActions: FC<ActionsType> = ({ myPack, packId, name, cardsCount }) => {
  const dispatch = useAppDispatch()

  const modalContent = useAppSelector(modalContentSelector)
  // const toggleModalFromState = useAppSelector(state => state.app.toggleModal)
  const toggleModalFromState = useAppSelector(state => state.packs.togglePackModal)

  const handlerTogglePopup = () => {
    // dispatch(toggleModal(true))
    dispatch(togglePackModal(true))
    dispatch(setModalContent('editPackName'))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
  }
  const handlerDeletePack = () => {
    dispatch(setModalContent('deletePack'))
    // dispatch(toggleModal(true))
    dispatch(togglePackModal(true))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
  }

  return (
    <div>
      <Button styleType="icon" disabled={!myPack && cardsCount === 0}>
        <div className={s.tooltip} data-tooltip="learn pack">
          <img src={teacher} alt="icon teacher" />
        </div>
      </Button>

      {myPack && (
        <>
          <Button styleType="icon" onClick={handlerTogglePopup}>
            <div className={s.tooltip} data-tooltip="edit name pack">
              <img src={edit} alt="icon edit" />
            </div>
          </Button>
          {toggleModalFromState && modalContent === 'editPackName' && <EditPackNameModal />}

          <Button styleType="icon" onClick={handlerDeletePack}>
            <div className={s.tooltip} data-tooltip="delete pack">
              <img src={trash} alt="icon trash" />
            </div>
          </Button>
          {toggleModalFromState && modalContent === 'deletePack' && <DeletePackModal />}
        </>
      )}
    </div>
  )
}
