import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from './hooks/useAppSelector'
import { isLoggedInSelector } from './selectors/Selectors'

export const PrivateRoutes = () => {
  const isAuth = useAppSelector(isLoggedInSelector)

  return isAuth ? <Outlet /> : <Navigate to={'/signIn'} />
}
