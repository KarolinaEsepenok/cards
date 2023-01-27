import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { Input } from 'common/components/Input/Input'
import { Modal } from 'common/components/modals/Modal'
import s from 'common/components/modals/Modals.module.scss'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { answerSelector, cardIdSelector, questionSelector } from 'common/selectors/Selectors'
import { toggleCardModal, updateCardTC } from 'pages/cards/cardsSlice'

export const EditCardModal = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams()
  const cardId = useAppSelector(cardIdSelector)
  const question = useAppSelector(questionSelector)
  const answer = useAppSelector(answerSelector)

  const [questionValue, setQuestionValue] = useState<string>(question)
  const [answerValue, setAnswerValue] = useState<string>(answer)

  const handleEditPack = () => {
    dispatch(updateCardTC(id ? id : '', cardId, { question: questionValue, answer: answerValue }))
    dispatch(toggleCardModal(false))
  }

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionValue(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswerValue(e.currentTarget.value)

  return (
    <Modal title={'Edit card'} isSaveDataModal={handleEditPack} typeBtn="save" value={questionValue}>
      <Input
        autoFocus
        value={questionValue}
        onChange={handleChangeQuestion}
        type="text"
        label="Question"
        className={!questionValue.length ? s.inputError : s.input}
        error={!questionValue.length ? 'write your question' : ''}
      />
      <Input value={answerValue} onChange={handleChangeAnswer} type="text" label="Answer" className={s.input} />
    </Modal>
  )
}
