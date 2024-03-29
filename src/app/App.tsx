import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import s from './App.module.scss'

import { initializeAppTC } from 'app/appSlice'
import { ErrorSnackbar } from 'common/components/errorSnackbar/ErrorSnackbar'
import { circularProgressStyle } from 'common/constants/circularProgressStyle'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Header } from 'common/modules/header/Header'
import { isAppInitialize, isLoadingSelector } from 'common/selectors/Selectors'
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
    return <CircularProgress sx={circularProgressStyle} />
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
