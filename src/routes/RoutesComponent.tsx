import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Profile } from '../pages/auth/profile/Profile'
import { Register } from '../pages/auth/register/Register'
import { Cards } from '../pages/cards/Cards'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

import { Error404 } from 'common/components/error404/Error404'
import { CheckEmail } from 'pages/auth/forgotPassword/checkEmail/CheckEmail'
import { ForgotPassword } from 'pages/auth/forgotPassword/ForgotPassword'
import { SetNewPassword } from 'pages/auth/forgotPassword/setNewPassword/SetNewPassword'
import { SignIn } from 'pages/auth/signIn/signIn'
import { LearnCard } from 'pages/cards/cardsList/learnCard/LearnCard'
import { Packs } from 'pages/packs/Packs'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.CARDS} element={<Cards />} />
        <Route path={PATH.CARD} element={<LearnCard />} />
      </Route>

      <Route path={PATH.MAIN} element={<Navigate to={PATH.SIGN_IN} />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.PASS_RECOVERY} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASS} element={<SetNewPassword />} />
      <Route path={PATH.ERROR_404} element={<Error404 />} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to={PATH.ERROR_404} />} />
    </Routes>
  )
}
