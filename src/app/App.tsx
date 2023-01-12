import React, { useEffect } from 'react'

import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/component/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { CheckEmail } from '../features/auth/forgotPassword/CheckEmail'
import { ForgotPassword } from '../features/auth/forgotPassword/ForgotPassword'
import { SetNewPassword } from '../features/auth/forgotPassword/SetNewPassword'
import SignIn from '../features/auth/signIn/signIn'
import { Header } from '../features/header/Header'
import { Profile } from '../features/profile/Profile'

import { initializeAppTC } from './app-reducer'
import s from './App.module.scss'

export const App = () => {
  const isLoading = useAppSelector(state => state.app.isLoading)
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])
  if (!isAppInitialized) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <Header />
      {isLoading && <LinearProgress className={s.linearProgress} />}
      <div className={s.centerApp}>
        <nav className={s.nav}></nav>
        <div>
          <Routes>
            <Route path={'/'} element={<Navigate to={'/signIn'} />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<ForgotPassword />} />
            <Route path="/checkEmail" element={<CheckEmail />} />
            <Route path="/setNewPassword/:token" element={<SetNewPassword />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
