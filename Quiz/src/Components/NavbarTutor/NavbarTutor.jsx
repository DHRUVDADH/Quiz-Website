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
      <div className={s.cont2}>
        <img src="../../Assets/dashboard.svg" />
        <div className={s.text}>Dashboard</div>
      </div>
      <div className={s.cont3}>
        <img src="../../Assets/quizzes.svg" />
        <div className={s.text}>Quizzes</div>
      </div>
      <div className={s.cont4}>
        <img src="../../Assets/students.svg" />
        <div className={s.text}>Students</div>
      </div>
      <div className={s.cont5}>
        <img src="../../Assets/results.svg" />
        <div className={s.text}>Results</div>
      </div>
      <div className={s.cont6}>
        <img src="../../Assets/help.svg" />
        <div className={s.text}>Help</div>
      </div>
    </div>
  )
}

export default NavbarTutor