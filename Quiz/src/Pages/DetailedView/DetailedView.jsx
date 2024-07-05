import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDetaildResult } from '../../services/operation/Faculty'
import s from "./DetailedView.module.css"

const DetailedView = () => {
    const { resultID } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetaildResult(resultID, setLoading, setData);
    }, [])
    return (
        <div className={s.main}>
            {
                loading ? (<h1>Loading..</h1>) : (<>
                    {
                        data == null ? (<h1>Data Not Found</h1>) : (<>
                            <>
                                <div className={s.description}>
                                    <div className={s.quizCover}>
                                        <div className={s.descriptionText}>
                                            <p>Sub Name : <span className={s.textBold}>{data.quizdetail.subName}</span> </p>
                                            <p>Sub ID : <span className={s.textBold}>{data.quizdetail.subId}</span> </p>
                                        </div>
                                        <div className={s.descriptionText}>
                                            <p>Quiz Name : <span className={s.textBold}>{data.quizdetail.title}</span> </p>
                                            <p>Total Marks : <span className={s.textBold}>{data.quizdetail.totalmarks}</span> </p>
                                        </div>
                                    </div>
                                    <div className={s.border}></div>
                                    <div className={s.quizCover}>
                                        <div className={s.descriptionText}>
                                            <p>Student Name : <span className={s.textBold}>{data.user.firstname}</span>  {data.user.lastname} </p>
                                            <p>Student ID :  <span className={s.textBold}>{data.user.student_id}</span> </p>
                                            <p>Student Marks : <span className={s.textBold}>{data.resultinfo.earnmarks}</span> </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={s.questionContainer}>
                                    <h4>Questions : </h4>
                                    <div>
                                        {
                                            data.QuizQuestion.questions.map((question, index) => (
                                                <div className={s.questionWrapper}>
                                                    <p className={s.question}>{index}. {question.question}</p>
                                                    {
                                                        question.options.map((option) => (
                                                            (option.key == data.resultinfo.answer[question._id]) ? (
                                                                <p className={(question.correctAnswer == data.resultinfo.answer[question._id]) ? `${s.correct} ${s.bold}` : `${s.incorrect} ${s.bold}`}>
                                                                    {option.key}.{option.ans}
                                                                </p>) : (
                                                                <p >
                                                                    {option.key}.{option.ans}
                                                                </p>
                                                            )
                                                        )
                                                        )
                                                    }
                                                    <div className={s.questionResult}>
                                                        <p className={s.marks}>
                                                            Marks : {question.marks}
                                                        </p>
                                                        {
                                                            question.correctAnswer == data.resultinfo.answer[question._id] ? (<h4 className={s.correct}>Correct</h4>) : (
                                                                <div>
                                                                    <h4 className={s.incorrect}>Wrong</h4>
                                                                    <div>
                                                                        <p>Selcted Option : {data.resultinfo.answer[question._id]}</p>
                                                                        <p>Correct Option : {question.correctAnswer}</p>
                                                                    </div>
                                                                </div>)
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        </>)
                    }
                </>)
            }
        </div>
    )
}

export default DetailedView