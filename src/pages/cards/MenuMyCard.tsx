import React from 'react'

import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import s from './cardsList/MenuMyCard.module.scss'

import dropDownMenu from 'assets/img/icons/DropDownMenu.svg'
import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'

//const options = ['Edit']

const ITEM_HEIGHT = 48

export const MenuMyCard = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button className={s.button} aria-haspopup="true" onClick={handleClick}>
        <img src={dropDownMenu} />
      </Button>
      <Menu
        id="shot-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button styleType="icon">
            <div className={s.tooltip} data-tooltip="edit question/answer"></div>
            <img className={s.iconDropDown} src={edit} alt="icon edit" />
            <span className={s.descrDropDown}>Edit</span>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button styleType="icon">
            <div className={s.tooltip} data-tooltip="delete this card">
              <img className={s.iconDropDown} src={trash} alt="icon trash" />
              <span className={s.descrDropDown}>Delete</span>
            </div>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button styleType="icon">
            <div className={s.tooltip} data-tooltip="delete this card">
              <img className={s.iconDropDown} src={teacher} alt="icon trash" />
              <span className={s.descrDropDown}>Learn</span>
            </div>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  )
}
{
  /*
<MenuItem onClick={handleClose}>
  <Button styleType="icon">
    <div className={s.tooltip} data-tooltip="delete this card">
      <img className={s.iconDropDown} src={teacher} alt="icon trash" />
      <span className={s.descrDropDown}>Learn</span>
    </div>
  </Button>
</MenuItem>*/
}
