import React from 'react';
import s from './Header.module.scss'
import logoCards from '../../assets/img/LogoCards.svg'
import {NavLink} from "react-router-dom";


export const Header = () => {

    return (

        <div className={s.headerContainer}>
            <div className={s.headerLogo}>
                <img src={logoCards}/>
            </div>

                <button className={s.headerBtn}>
                   <NavLink className={s.headerBtnLink} to={'/signIn'} >Sign in</NavLink> </button>


        </div>
    );
};
{/*export const Header = () => {
  const [select, setSelect] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLogin = useAppSelector((state) => state.auth.isLoggedIn)
  const userData = useAppSelector((state) => state.profile.user)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const onClickLoginHandler = () => d{
    if (isLogin) {
      setSelect(!select)
    }
  }

  const onMouseLeaveHandler = () => {
    setTimeout(() => setSelect(false), 300)
  }

  const onClickLogOutHandler = () => {
    dispatch(logoutTC())
  }

  const nav = (
    <div className={s.selector} onMouseLeave={onMouseLeaveHandler}>
      <Link to={'/profile'} className={s.linkItem}>
        Profile
      </Link>
      <Link to={'/forgot'} className={s.linkItem}>
        Recovery Password
      </Link>
      <Link to={'/set_new_password/aaaa-bbbb-cccc-dddd'} className={s.linkItem}>
        New Password
      </Link>
      <Link to={'/packs_list'} className={s.linkItem}>
        Packs
      </Link>
      <button onClick={onClickLogOutHandler}>Log Out</button>
    </div>
  )

  const user = (
    <div className={s.user} onClick={onClickLoginHandler}>
      <div className={s.user_name}>{userData.name}</div>
      <div className={s.user_photo}>
        <img src={userData.avatar || noAvatar} alt="avatar" />
      </div>
      {select ? nav : ''}
    </div>
  )

  return (
    <div className={s.header}>
      <LinearPreloader turnOn={loading} />
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="logo" onClick={() => navigate('/packs_list')} />
        </div>
        {isLogin && user}
      </div>
    </div>
  )
}*/}