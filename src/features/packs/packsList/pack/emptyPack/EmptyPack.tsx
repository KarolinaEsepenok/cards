import React from 'react'

import { Button } from '../../../../../common/component/button/Button'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'

export const EmptyPack = () => {
  const cards = useAppSelector(state => state.cards.cards)

  console.log(cards)

  return (
    <div>
      <h2>{'Need render names pack'}</h2>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button styleType="primary">Add new card</Button>
    </div>
  )
}
