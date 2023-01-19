import React, { useEffect } from 'react'

import { CircularProgress, LinearProgress } from '@mui/material'

import { ErrorSnackbar } from '../common/component/errorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { isAppInitialize, isLoadingSelector } from '../common/selectors/Selectors'
import { Header } from '../features/header/Header'
import { RoutesComponent } from '../routes/RoutesComponent'

import { initializeAppTC } from './app-reducer'
import s from './App.module.scss'

export const App = () => {
  const isAppInitialized = useAppSelector(isAppInitialize)
  const isLoading = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isAppInitialized) {
      dispatch(initializeAppTC())
    }
  }, [])

  if (!isAppInitialized) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <Header />
      {isLoading && <LinearProgress className={s.linearProgress} />}

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
