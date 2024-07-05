// QuestionShow.js

import React, { useEffect, useState } from 'react';
import styles from './QuestionShow.module.css';
import Loading from '../Loading/Loading';
import { useParams  , useNavigate} from "react-router-dom";
import { fetchQuestions, fetchAnswer, updateAnswer , submitQuiz } from '../../services/operation/quiz';
import { toast } from 'react-toastify';


const QuestionShow = () => {
  const { quizID } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({}); // State to store submitted answers

  useEffect(() => {
    // Function to fetch questions and load initial state
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const {mcq , success} = await fetchQuestions(quizID ,setQuestions,setSelectedOptions,setLoading , navigate);
        if(!success){
          toast.error("Something went wring");
          return;
        }
        setQuestions(mcq);

        const fetchedAnswers = await fetchAnswer(quizID);
        setSubmittedAnswers(fetchedAnswers);

        // Initialize selectedOptions based on fetched answers
        const initialSelectedOptions = mcq.map(q => {
          return {
            _id: q._id,
            ans: fetchedAnswers[q._id] || null  // Use submitted answer if available
          };
        });
        setSelectedOptions(initialSelectedOptions);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
        setLoading(false);
      }
    };

    fetchData(); // Invoke fetchData on component mount
  }, [quizID]);

  const handleOptionChange = (questionIndex, optionKey, questionID) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = { _id: questionID, ans: optionKey };
    setSelectedOptions(newSelectedOptions);

    // Update answer in the backend
    updateAnswer(quizID, questionID, optionKey);
  };

  const submitHandler =  () =>{
    submitQuiz(quizID);
  }

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
                <div key={q._id} className={styles.questionBlock}>
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
              <button onClick={submitHandler}>Submit</button>
            </div>
          )}
        </>
      )
}
   </div>
  );
};

export default QuestionShow;