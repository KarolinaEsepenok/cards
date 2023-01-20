import React from 'react'

import { Button } from '../button/Button'
import { Input } from '../Input/Input'

import { BasicModal } from './BasicModal'

export const AddCardModal = () => {
  return (
    <BasicModal title={'Add new card'}>
      <>
        <select>
          <option value="0">Select1</option>
          <option value="1">Select2</option>
        </select>

        <Input type="text" label="Question" />
        <Input type="text" label="Answer" />

        <Button styleType="primary">save</Button>
      </>
    </BasicModal>
  )
}
