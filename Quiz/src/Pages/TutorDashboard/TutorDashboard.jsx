import React, { useState } from 'react'
import s from './TutorDashboard.module.css'
import NavbarTutor from '../../Components/NavbarTutor/NavbarTutor'
import QuizModal from '../../Components/QuizModal/QuizModal';
import { Outlet } from 'react-router-dom';

const TutorDashboard = () => {
  const number = 10;
  const [showmodal, setShowmodal] = useState(false)

  const closeModal = () => setShowmodal(false)

  return (
    <div className={s.container}>
      <div className={s.main}>
        <div className={s.cont1}>
          <NavbarTutor></NavbarTutor>
        </div>
        <div className={s.cont2}>
          <div className={s.sub1}>
            <div className={`flex-center ${s.item1}`}>
              <div className={s.child1}>Dashboard</div>
              <div onClick={() => setShowmodal(true)} className={s.child2}>
                <img src="../../Assets/newquizicon.svg" />
                <div className={s.text}>New quiz</div>
              </div>
            </div>
            <div className={s.item2}>
              <img src="../../Assets/blue-mail.svg" />
              <div className={s.wrap}>
                <div className={s.number}>{number}</div>
              </div>
            </div>
            <div className={s.item3}>
              <img src="../../Assets/blue-bell.svg" />
              <div className={s.wrap}>
                <div className={s.number}>{number}</div>
              </div>
            </div>
            <div className={s.item4}>
              <div className={s.wrap}>
                <div className={s.name}>Dhruv Dadhania</div>
                <div className={s.type}>Tutor</div>
              </div>
              <img src="../../Assets/arrowlist.svg" />
            </div>
          </div>
          <div className={s.sub2}>
            <Outlet />
          </div>
        </div>
      </div>
      {showmodal && <QuizModal closeModal={closeModal} className={s.quizModal} />}
    </div>
  )
}

export default TutorDashboard