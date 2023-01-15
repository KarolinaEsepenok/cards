import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../common/hooks/useAppSelector'
import { isLoggedInSelector } from '../common/selectors/Selectors'

export const PrivateRoutes = () => {
  const isAuth = useAppSelector(isLoggedInSelector)

  return isAuth ? <Outlet /> : <Navigate to={'/signIn'} />
}
