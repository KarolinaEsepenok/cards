import React from 'react'

import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import { ErrorSnackbar } from '../common/component/ErrorSnackbar/ErrorSnackbar'
import SignIn from '../features/auth/signIn/signIn'
import { Header } from '../features/Header/Header'
import { Profile } from '../features/profile/Profile'

import s from './App.module.scss'
import { RootStateType } from './store'

export const App = () => {
  const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

  return (
    <>
      {isLoading && <LinearProgress className={s.linearProgress} />}
      <div className={s.container}>
        <ErrorSnackbar />

        <Header />

        <Routes>
          <Route path={'/'} element={<Navigate to={'/signIn'} />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}
