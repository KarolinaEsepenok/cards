import React from 'react'

import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import s from './PacksFilterMyAll.module.scss'

export const PacksFilterMyAll: React.FC = React.memo(props => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  // const submit = (values: FilterType, { setSubmitting }: any) => {
  // console.log(values)
  // props.onFilterChanged(values)
  // setSubmitting(false)
  // }
  const sortMyAllToggle = (value: boolean) => {
    alert(value)
    // dispatch(setOnlyMyPacks(value))
    // if (state.onlyMyPacks !== value) {
    //   dispatch(getCardsPackTC())
    // }
  }

  return (
    <div>
      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
        <div className={s.buttons}>
          <Button
            className={s.btn_my}
            // className={`${s.btn_my} ${state.onlyMyPacks ? s.btn_selected : ''}`}
            onClick={() => sortMyAllToggle(true)}
            disabled={isLoading}
          >
            My
          </Button>
          <Button
            className={s.btn_all}
            // className={`${s.btn_all} ${!state.onlyMyPacks ? s.btn_selected : ''}`}
            onClick={() => sortMyAllToggle(false)}
            disabled={isLoading}
          >
            All
          </Button>
        </div>
      </div>
    </div>
  )
})
