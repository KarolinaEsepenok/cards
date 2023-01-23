import React, { useState } from 'react'

import { Button } from '../../../../../../common/component/button/Button'
import { EditCardModal } from '../../../../../../common/component/modals/EditCardModal'
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch'
import { deleteCardTC } from '../../../cardsReducer'

import edit from 'assets/img/icons/edit.svg'
import trash from 'assets/img/icons/trash.svg'

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
        <img src={edit} alt="icon edit" />
      </Button>

      <Button styleType="icon" onClick={handlerDeletePack}>
        <img src={trash} alt="icon trash" />
      </Button>

      {toggle && (
        <EditCardModal setToggle={setToggle} toggle={toggle} cardId={cardId} question={question} answer={answer} />
      )}
    </>
  )
}
