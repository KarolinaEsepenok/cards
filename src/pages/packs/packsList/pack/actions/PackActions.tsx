import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './PackActions.module.scss'

import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
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
  const navigate = useNavigate()

  const handelLearnPack = () => {
    dispatch(setPackId(packId))
    navigate(`/cards/${packId}/learn`)
  }

  const handelEditPack = () => {
    dispatch(togglePackModal(true))
    dispatch(setModalContent('editPackName'))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
  }
  const handelDeletePack = () => {
    dispatch(setModalContent('deletePack'))
    dispatch(togglePackModal(true))
    dispatch(setPackId(packId))
    dispatch(setPackName(name))
  }

  return (
    <div>
      <Button styleType="icon" disabled={!myPack && cardsCount === 0} onClick={handelLearnPack}>
        <div className={s.tooltip} data-tooltip="learn pack">
          <img src={teacher} alt="icon teacher" />
        </div>
      </Button>

      {myPack && (
        <>
          <Button styleType="icon" onClick={handelEditPack}>
            <div className={s.tooltip} data-tooltip="edit name pack">
              <img src={edit} alt="icon edit" />
            </div>
          </Button>

          <Button styleType="icon" onClick={handelDeletePack}>
            <div className={s.tooltip} data-tooltip="delete pack">
              <img src={trash} alt="icon trash" />
            </div>
          </Button>
        </>
      )}
    </div>
  )
}
