import React from 'react'

import editName from '../../assets/img/icons/profile_edit_name.png'
import ava from '../../assets/img/profile_photo.jpg'

import profile from './Profile.module.scss'

export const Profile = () => {
  return (
    <div className={profile.profile_wrapper}>
      <h2 className={profile.profile_title}>Personal Information</h2>

      <div className={profile.profile_img}>
        <img src={ava} alt={'photo profile'} />
        <label className={profile.profile_file}>
          <input type={'file'} />
        </label>
      </div>

      <div className={profile.profile_name}>
        Ivan
        <div className={profile.profile_name_edit}>
          <img src={editName} alt={'edit name'} />
        </div>
      </div>

      <span className={profile.profile_email}>j&johnson@gmail.com</span>

      <div className={profile.profile_btn_box}>
        <button className={profile.profile_btn}>Log Out</button>
      </div>
    </div>
  )
}