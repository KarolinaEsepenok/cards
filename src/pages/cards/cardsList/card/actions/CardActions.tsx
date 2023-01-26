import React, { useState } from 'react'

import s from './CardActions.module.scss'

import edit from 'assets/img/icons/edit.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import { EditCardModal } from 'common/components/modals/EditCardModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { deleteCardTC } from 'pages/cards/cardsSlice'

type CardActionsType = {
  cardId: string
  question: string
  answer: string
}
export const CardActions: React.FC<CardActionsType> = ({ cardId, question, answer }) => {
  const dispatch = useAppDispatch()

  const [toggle, setToggle] = useState(false)

  const handlerDeletePack = () => {
    dispatch(deleteCardTC(cardId))
  }

  return (
    <>
      <Button styleType="icon" onClick={() => setToggle(true)}>
        <div className={s.tooltip} data-tooltip="edit question/answer">
          <img src={edit} alt="icon edit" />
        </div>
      </Button>

      <Button styleType="icon" onClick={handlerDeletePack}>
        <div className={s.tooltip} data-tooltip="delete this card">
          <img src={trash} alt="icon trash" className={s.tooltip} />
        </div>
      </Button>

      {toggle && (
        <EditCardModal setToggle={setToggle} toggle={toggle} cardId={cardId} question={question} answer={answer} />
      )}
    </>
  )
}
