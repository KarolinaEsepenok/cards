import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import editName from '../../assets/img/icons/profile_edit_name.png'
import ava from '../../assets/img/profile_photo.jpg'
import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { logoutTC } from '../register/registerReducer'

import profile from './Profile.module.scss'
import { ProfileEditName } from './ProfileEditName'

type ProfileType = {}

export const Profile: React.FC<ProfileType> = () => {
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
  const emailFromState = useAppSelector(state => state.auth.email)
  const nameFromState = useAppSelector(state => state.auth.name)
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  console.log(nameFromState)

  const [name, setName] = useState(nameFromState)
  const [email, setEmail] = useState(emailFromState)
  const [editMode, setEditMode] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutTC())
  }
  const editModeOpen = () => {
    setEditMode(true)
  }

  if (!isAppInitialized) {
    navigate('/signIn')
  }
  if (!isLoggedIn) {
    navigate('/signIn')
  }

  useEffect(() => {
    //need for render name/email from state in input when first render
    setName(name)
    setEmail(email)
  }, [nameFromState, emailFromState])

  return (
    <>
      <div className={profile.profile_wrapper}>
        <h2 className={profile.profile_title}>Personal Information</h2>

        <div className={profile.profile_img}>
          <img src={ava} alt={'photo profile'} />
          <label className={profile.profile_file}>
            <input type={'file'} />
          </label>
        </div>

        {editMode ? (
          <ProfileEditName setEditMode={setEditMode} />
        ) : (
          <div className={profile.profile_name}>
            {nameFromState}
            <div onClick={editModeOpen} className={profile.profile_name_edit}>
              <img src={editName} alt={'edit name'} />
            </div>
          </div>
        )}

        <span className={profile.profile_email}>{emailFromState}</span>

        <div className={profile.profile_btn_box}>
          <Button styleType={'secondary'} onClick={logout}>
            LogOut
          </Button>
        </div>
      </div>
    </>
  )
}
