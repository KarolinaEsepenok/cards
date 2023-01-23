import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import s from './App.module.scss'
import { initializeAppTC } from './appReducer'

import { ErrorSnackbar } from 'common/component/errorSnackbar/ErrorSnackbar'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { isAppInitialize, isLoadingSelector } from 'common/selectors/Selectors'
import { Header } from 'features/header/Header'
import { RoutesComponent } from 'routes/RoutesComponent'

export const App = () => {
  const dispatch = useAppDispatch()
  const isAppInitialized = useAppSelector(isAppInitialize)
  const isLoading = useAppSelector(isLoadingSelector)

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
      {isLoading && (
        <div className={s.linearProgress}>
          <LinearProgress />
        </div>
      )}

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
