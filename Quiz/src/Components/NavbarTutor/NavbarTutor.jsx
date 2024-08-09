import React from 'react'
import s from './NavbarTutor.module.css'
import { Link } from 'react-router-dom'

const NavbarTutor = () => {
  return (
    <div className={s.main}>
      <Link to="/" className={s.main}>
        <div className={s.cont1}>
          <img src="../../Assets/Charusat-Logo.png" />
        </div>
      </Link>
      <Link to="/faculty" className={s.main}>
        <div className={s.cont2}>
          <img src="../../Assets/dashboard.svg" />
          <div className={s.text}>Dashboard</div>
        </div>
      </Link>
      <Link to="/faculty" className={s.main}>
        <div className={s.cont3}>
          <img src="../../Assets/quizzes.svg" />
          <div className={s.text}>Quizzes</div>
        </div>
      </Link>
    </div>
  )
}

export default NavbarTutor