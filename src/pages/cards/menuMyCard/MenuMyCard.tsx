import React, { useState, MouseEvent, FC } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import dropDownMenu from 'assets/img/icons/DropDownMenu.svg'
import edit from 'assets/img/icons/edit.svg'
import teacher from 'assets/img/icons/teacher.svg'
import trash from 'assets/img/icons/trash.svg'
import { Button } from 'common/components/button/Button'
import s from 'pages/cards/menuMyCard/MenuMyCard.module.scss'

const ITEM_HEIGHT = 48

type MenuMyCardType = {
  learnPackCallback: () => void
  deletePackCallback: () => void
  editPackCallback: () => void
}

export const MenuMyCard: FC<MenuMyCardType> = ({ learnPackCallback, deletePackCallback, editPackCallback }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button className={s.button} aria-haspopup="true" onClick={handleClick}>
        <img src={dropDownMenu} alt="" />
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
            width: '23ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button styleType="icon" onClick={editPackCallback}>
            <div className={s.menuItem}>
              <img className={s.iconDropDown} src={edit} alt="icon edit" />
              <span className={s.descrDropDown}>Edit pack name</span>
            </div>
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button styleType="icon" onClick={deletePackCallback}>
            <div className={s.menuItem}>
              <img className={s.iconDropDown} src={trash} alt="icon trash" />
              <span className={s.descrDropDown}>Delete pack</span>
            </div>
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button styleType="icon" onClick={learnPackCallback}>
            <div className={s.menuItem}>
              <img className={s.iconDropDown} src={teacher} alt="icon learn" />
              <span className={s.descrDropDown}>Learn pack</span>
            </div>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  )
}
