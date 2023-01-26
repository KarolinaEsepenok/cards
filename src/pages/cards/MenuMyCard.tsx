import React from 'react'

import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom'

import dropDownMenu from 'assets/img/icons/DropDownMenu.svg'
import { Button } from 'common/components/button/Button'

const options = ['Edit']

const ITEM_HEIGHT = 48

export const LongMenu = () => {
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
      <Button aria-label="more" aria-controls="shot-menu" aria-haspopup="true" onClick={handleClick}>
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
        {options.map(option => (
          <>
            <MenuItem key={option} selected={option === ''} onClick={handleClose}>
              <NavLink to={'/profile'}>Edit</NavLink>
            </MenuItem>
            <MenuItem key={option} selected={option === ''} onClick={handleClose}>
              <NavLink to={'/profile'}>Delete</NavLink>
            </MenuItem>
          </>
        ))}
      </Menu>
    </div>
  )
}
