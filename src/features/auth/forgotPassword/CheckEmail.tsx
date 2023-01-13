import React from 'react'

import { Button, FormControl, FormGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/useAppSelector'

export const CheckEmail = () => {
  const email = useAppSelector(state => state.password.currenEmail)
  const navigate = useNavigate()

  return (
    <div>
      <h1 style={{ color: 'black' }}>Check your email</h1>
      <form>
        <FormControl>
          <FormGroup>
            <div style={{ color: 'black' }}>
              We&apos;ve sent an Email with instruction to {email}
            </div>
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ marginTop: 3, fontFamily: 'Montserrat' }}
              onClick={() => {
                navigate('/signIn')
              }}
            >
              Back to login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  )
}
