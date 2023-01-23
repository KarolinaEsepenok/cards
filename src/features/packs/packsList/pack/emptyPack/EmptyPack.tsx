import React from 'react'

import { Button } from 'common/component/button/Button'
import { useDispatch } from 'react-redux'

import { toggleModal } from '../../../../../app/appReducer'
import { AddCardModal } from '../../../../../common/component/modals/AddCardModal'

export const EmptyPack = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>{'Need render names pack'}</h2>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button onClick={() => dispatch(toggleModal(true))} styleType={'primary'}>
        Add New Card
      </Button>

      <AddCardModal />
    </div>
  )
}
