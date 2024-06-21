import React, { useState } from 'react'
import s from './Tutor.module.css'
import NavbarTutor from '../../Components/NavbarTutor/NavbarTutor'
import QuizModal from '../../Components/QuizModal/QuizModal'
import { Outlet } from 'react-router-dom'
import QuestionShow from '../../Components/QuestionShow/QuestionShow'

const Tutor = () => {
    const number = 10;
    const [showmodal, setShowmodal] = useState(false)

    const closeModal = () => setShowmodal(false)
    return (
        <div className={s.main}>
            <div className={s.container}>

                <NavbarTutor />

                <div className={s.sec2}>

                    <div className={s.sub1}>

                        <div className={`flex-center ${s.item1}`}>
                            <div className={s.child1}>Dashboard</div>
                        </div>

                        <div className={s.item4}>

                            <div onClick={() => setShowmodal(true)} className={s.child2}>
                                <img src="../../Assets/newquizicon.svg" />
                                <div className={s.text}>New quiz</div>
                            </div>

                            <div className={s.navFaculty}>

                                <div className={s.wrap}>
                                    <div className={s.name}>Dhruv Dadhania</div>
                                    <div className={s.type}>Tutor</div>
                                </div>

                                <img src="../../Assets/arrowlist.svg" />
                            </div>

                        </div>

                    </div>

                    <div className={s.sub2}>
                        <Outlet />
                    </div>
                </div>
            </div>
            {showmodal && <QuizModal closeModal={closeModal} className={s.quizModal} />}
            {/* <QuestionShow className={s.ccc}></QuestionShow> */}
        </div>
    )
}

export default Tutor