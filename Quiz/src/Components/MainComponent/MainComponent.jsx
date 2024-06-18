import React from 'react'
import s from "./MainComponent.module.css"

const MainComponent = () => {
  const number = 10;
  return (
    <div>
      <div className={s.main1}>
        <div className={s.cont1}>
          <img src="../../Assets/Charusat-Logo.png" />
        </div>
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
      <div className={s.main2}>
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
      <div className={s.main3}></div>
    </div>
  )
}

export default MainComponent