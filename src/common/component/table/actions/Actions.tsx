import React, { FC } from 'react'

import edit from '../../../../assets/img/icons/edit.svg'
import teacher from '../../../../assets/img/icons/teacher.svg'
import trash from '../../../../assets/img/icons/trash.svg'

type ActionsType = {
  myPack: boolean
}
export const Actions: FC<ActionsType> = ({ myPack }) => {
  return (
    <div>
      <button>
        <img src={teacher} alt="icon teacher" />
      </button>
      {myPack && (
        <>
          <button>
            <img src={edit} alt="icon edit" />
          </button>
          <button>
            <img src={trash} alt="icon trash" />
          </button>
        </>
      )}
    </div>
  )
}
