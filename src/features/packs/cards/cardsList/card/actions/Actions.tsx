import React from 'react'

import edit from '../../../../../../assets/img/icons/edit.svg'
import trash from '../../../../../../assets/img/icons/trash.svg'
import { Button } from '../../../../../../common/component/button/Button'

export const Actions = () => {
  return (
    <>
      <Button styleType="icon">
        <img src={edit} alt="icon edit" />
      </Button>

      <Button styleType="icon">
        <img src={trash} alt="icon trash" />
      </Button>
    </>
  )
}
