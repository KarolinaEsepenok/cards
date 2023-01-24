import React, { FC, useState } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Skeleton } from '@mui/material'

import s from './CardAnswer.module.scss'

import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setCardGradeTC } from 'pages/cards/cardsSlice'
type CardAnswerType = {
  answer: string
  cardId: string
  handelNextCard: () => void
}
export const CardAnswer: FC<CardAnswerType> = ({ answer, handelNextCard, cardId }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('1')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const handelSubmit = () => {
    const grade = Number(value)

    dispatch(setCardGradeTC({ cardId, grade }))
    handelNextCard()
  }

  return (
    <form onSubmit={handelSubmit} className={s.cardAnswer}>
      <h3 className={s.title}>
        Answer: {answer ? <span className={s.subtitle}>{answer}</span> : <Skeleton animation="wave" />}
      </h3>

      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Rate yourself:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Did not know" />
            <FormControlLabel value="2" control={<Radio />} label="Forgot" />
            <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
            <FormControlLabel value="4" control={<Radio />} label="Сonfused" />
            <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
          </RadioGroup>
        </FormControl>
      </div>
      <Button styleType="primary" onClick={() => handelSubmit()}>
        Next
      </Button>
    </form>
  )
}
