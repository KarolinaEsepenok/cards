import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../features/auth/forgotPassword/CheckEmail/CheckEmail'
import { ForgotPassword } from '../features/auth/forgotPassword/ForgotPassword'
import { SetNewPassword } from '../features/auth/forgotPassword/SetNewPassword/SetNewPassword'
import { Profile } from '../features/auth/profile/Profile'
import { Register } from '../features/auth/register/Register'
import { SignIn } from '../features/auth/signIn/signIn'
import { Packs } from '../features/packs/Packs'
import Test from '../Test'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
      </Route>
      <Route path={PATH.MAIN} element={<Navigate to={PATH.SIGN_IN} />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.PASS_RECOVERY} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASS} element={<SetNewPassword />} />
      <Route path={PATH.ERROR404} element={<div>404: Page not found</div>} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to="404" />} />
      <Route path={'/test'} element={<Test />} />
    </Routes>
  )
}
