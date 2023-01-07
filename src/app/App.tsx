import React from 'react'

import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import { ErrorSnackbar } from '../common/component/ErrorSnackbar/ErrorSnackbar'
import { PasswordRecovery } from '../features/auth/passwordRecovery/PasswordRecovery'
import SignIn from '../features/auth/signIn/signIn'
import ErrorPage from '../features/errorPage/ErrorPage'
import { Header } from '../features/Header/Header'
import Profile from '../features/profile/Profile'

import s from './App.module.scss'
import { RootStateType } from './store'

export const App = () => {
  const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

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
            <Route path="/passwordRecovery" element={<PasswordRecovery />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/error404" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
