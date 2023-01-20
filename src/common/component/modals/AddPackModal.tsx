import React from 'react'

import { useDispatch } from 'react-redux'

import { addNewPackTC } from '../../../features/packs/packsReducer'
import { Button } from '../button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import { BasicModal } from './BasicModal'

export const AddPackModal = () => {
  const dispatch = useDispatch()

  return (
    <BasicModal title={'Add new pack'}>
      <>
        <Input type="text" label="Name pack" />
        <Checkbox />
        <Button
          styleType="primary"
          // @ts-ignore
          onClick={() => dispatch(addNewPackTC({ cardsPack: { name: 'NewPack', deckCover: '', private: false } }))}
        >
          save
        </Button>
      </>
    </BasicModal>
  )
}
