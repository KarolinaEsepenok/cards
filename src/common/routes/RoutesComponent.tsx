import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../../features/auth/forgotPassword/CheckEmail/CheckEmail'
import { ForgotPassword } from '../../features/auth/forgotPassword/ForgotPassword'
import { SetNewPassword } from '../../features/auth/forgotPassword/SetNewPassword/SetNewPassword'
import { SignIn } from '../../features/auth/signIn/signIn'
import { Profile } from '../../features/profile/Profile'
import { Register } from '../../features/register/Register'
import { PrivateRoutes } from '../PrivateRoutes'

import { PATH } from './routes'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
      <Route path={PATH.MAIN} element={<Navigate to={PATH.SIGN_IN} />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.PASS_RECOVERY} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASS} element={<SetNewPassword />} />
      <Route path="/404" element={<div>404: Page not found</div>} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to="404" />} />
    </Routes>
  )
}
