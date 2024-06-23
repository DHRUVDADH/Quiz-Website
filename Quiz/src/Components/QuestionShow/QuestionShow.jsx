// QuestionShow.js

import React, { useEffect, useState } from 'react';
import styles from './QuestionShow.module.css';
import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import { fetchQuestions , updateAnswer } from '../../services/operation/quiz';

const QuestionShow = () => {
  const { quizID } = useParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
// 
  useEffect(() => {
    fetchQuestions(quizID, setQuestions, setSelectedOptions, setLoading);
  }, [quizID]); 

  const handleOptionChange = (questionIndex, optionKey, questionID) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = { _id: questionID, ans: optionKey };
    setSelectedOptions(newSelectedOptions);
    updateAnswer(quizID , questionID , optionKey)
    console.log(selectedOptions);
  };


 

  return (
    <div className={styles.main}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!questions ? (
            <p>No Questions</p>
          ) : (
            <div className={styles.questionContainer}>
              {questions.map((q, questionIndex) => (
                <div key={q.id} className={styles.questionBlock}>
                  <h2 className={styles.question}>{q.question}</h2>
                  <ul className={styles.optionsList}>
                    {q.options.map(option => (
                      <li key={option.key} className={styles.option}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={option.key}
                            checked={selectedOptions[questionIndex]?.ans === option.key}
                            onChange={() => handleOptionChange(questionIndex, option.key, q._id)}
                          />
                          {option.ans}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <p className={styles.marks}>Marks: {q.marks}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionShow;
