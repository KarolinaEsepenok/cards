import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { Button } from 'common/components/button/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import s from 'pages/cards/cardsList/learnCard/answer/Answer.module.scss'
import { setCardGradeTC } from 'pages/cards/cardsSlice'

type CardAnswerType = {
  answer: string
  cardId: string
  handelNextCard: () => void
}
export const Answer: FC<CardAnswerType> = ({ answer, handelNextCard, cardId }) => {
  const [value, setValue] = useState('1')
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const handelSubmit = () => {
    const grade = Number(value)

    dispatch(setCardGradeTC({ cardId, grade }))
    handelNextCard()
  }

  return (
    <>
      <h3 className={s.title}>
        Answer: <span className={s.subtitle}>{answer}</span>
      </h3>

      <div>
        <FormControl>
          <FormLabel id="controlled-radio-buttons-group">Rate yourself:</FormLabel>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Did not know" />
            <FormControlLabel value="2" control={<Radio />} label="Forgot" />
            <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
            <FormControlLabel value="4" control={<Radio />} label="Knew partially" />
            <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
          </RadioGroup>
        </FormControl>
      </div>

      <Button styleType="primary" onClick={handelSubmit}>
        Next
      </Button>
    </>
  )
}
