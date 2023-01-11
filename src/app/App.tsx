import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/component/ErrorSnackbar/ErrorSnackbar'
import SignIn from '../features/auth/signIn/signIn'
import { Header } from '../features/Header/Header'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

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
            <Route path={'/'} element={<Navigate to={'/signIn'} />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
