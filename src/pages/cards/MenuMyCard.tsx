import React from 'react'

import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import { Button } from 'common/components/button/Button'

const options = ['None', 'Atria', 'Callisto']

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
        fdh;kjf
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
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
