import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/component/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { CheckEmail } from '../features/auth/fogotPassword/CheckEmail'
import { ForgotPassword } from '../features/auth/fogotPassword/ForgotPassword'
import { SetNewPassword } from '../features/auth/fogotPassword/SetNewPassword'
import { Header } from '../features/header/Header'
import { Profile } from '../features/profile/Profile'

import s from './App.module.scss'

export const App = () => {
  const isLoading = useAppSelector(state => state.app.isLoading)
  const dispatch = useAppDispatch()

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <Header />
      {isLoading && <LinearProgress className={s.linearProgress} />}
      <div className={s.centerApp}>
        <nav className={s.nav}></nav>
        <div>
          <Routes>
            {/*<Route path={'/'} element={<Navigate to={'/signIn'} />} />*/}
            <Route path={'/'} element={<Navigate to={'/profile'} />} />
            {/*<Route path="/signIn" element={<SignIn />} />*/}
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<ForgotPassword />} />
            <Route path="/checkEmail" element={<CheckEmail />} />
            <Route path="/set-new-password/:token" element={<SetNewPassword />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
