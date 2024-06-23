import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams , useNavigate } from 'react-router-dom'
import { getQuestionEdit , setQuestinos } from "../../services/operation/quiz"
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify';
import s from './QuestionAdd.module.css';

const QuestionAdd = () => {
  const { quizID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialQuestionCount, setInitialQuestionCount] = useState(3);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const localStorageQuestions = JSON.parse(localStorage.getItem(`${quizID}-questions`));
    if (localStorageQuestions && localStorageQuestions.length > 0) {
      setQuestions(localStorageQuestions);
    } else {
      getQuestionEdit(quizID, setQuestions, setInitialQuestionCount, initializeQuestions, setLoading)
    }
  }, []);

  const initializeQuestions = (count) => {
    const initialQuestions = Array.from({ length: count }, () => ({
     
      question: '',
      options: [
        { key: 'A', ans: '' },
        { key: 'B', ans: '' },
        { key: 'C', ans: '' },
        { key: 'D', ans: '' }
      ],
      correctAnswer: '',
      marks: ''
    }));
    setQuestions(initialQuestions);
    localStorage.setItem(`${quizID}-questions`, JSON.stringify(initialQuestions));
  };

  const addQuestion = () => {
    if (questions.length < initialQuestionCount) {
      const newQuestions = [...questions, {
        question: '', options: [
          { key: 'A', ans: '' },
          { key: 'B', ans: '' },
          { key: 'C', ans: '' },
          { key: 'D', ans: '' }
        ], correctAnswer: '', marks: ''
      }];
      setQuestions(newQuestions);
      localStorage.setItem(`${quizID}-questions`, JSON.stringify(newQuestions));
    } else {

      const newQuestions = [...questions, {
        question: '', options: [
          { key: 'A', ans: '' },
          { key: 'B', ans: '' },
          { key: 'C', ans: '' },
          { key: 'D', ans: '' }
        ], correctAnswer: '', marks: ''
      }];
      setQuestions(newQuestions);
      localStorage.setItem(`${quizID}-questions`, JSON.stringify(newQuestions));
    }

  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    localStorage.setItem(`${quizID}-questions`, JSON.stringify(newQuestions));
  };

  const handleChange = (index, optionIndex, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];

    if (name.startsWith('option-')) {
      newQuestions[index].options[optionIndex].ans = value;
    } else if (name === 'correctAnswer') {
      newQuestions[index].correctAnswer = value;
    } else if (name === 'marks') {
      newQuestions[index].marks = value;
    } else {
      newQuestions[index].question = value;
    }

    setQuestions(newQuestions);
    localStorage.setItem(`${quizID}-questions`, JSON.stringify(newQuestions));
  };

  const validateQuestions = () => {
    let isValid = true;
  
    questions.forEach((question, index) => {
      const { question: q, options, correctAnswer, marks } = question;
  
      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        toast.error(`Question ${index + 1} is invalid: Question must be a non-empty string.`);
        isValid = false;
        return; 
      }
  
      // Validate options
      if (!Array.isArray(options) || options.length !== 4) {
        toast.error(`Question ${index + 1} is invalid: Options must be an array of 4 objects.`);
        isValid = false;
        return;
      }
  
      // Validate each option
      options.forEach((option, optionIndex) => {
        const { key, ans } = option;
        if (key !== 'A' && key !== 'B' && key !== 'C' && key !== 'D') {
          toast.error(`Question ${index + 1}, Option ${optionIndex + 1} is invalid: Key must be 'A', 'B', 'C', or 'D'.`);
          isValid = false;
          return; 
        }
        if (!ans || typeof ans !== 'string' || ans.trim().length === 0) {
          toast.error(`Question ${index + 1}, Option ${optionIndex + 1} is invalid: Answer must be a non-empty string.`);
          isValid = false;
          return; 
        }
      });
  
      // Validate correctAnswer
      if (!correctAnswer || typeof correctAnswer !== 'string' || !['A', 'B', 'C', 'D'].includes(correctAnswer)) {
        toast.error(`Question ${index + 1} is invalid: Correct answer must be 'A', 'B', 'C', or 'D'.`);
        isValid = false;
        return; // Exit the current iteration
      }
  
      // Validate marks
      if (!marks || isNaN(marks) || parseInt(marks) <= 0) {
        toast.error(`Question ${index + 1} is invalid: Marks must be a positive number.`);
        isValid = false;
        return; // Exit the current iteration
      }
    });
  
    return isValid; // Return the overall validation result
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questions);
    if(validateQuestions()){
      setQuestinos(quizID,questions,setQuestinos,setLoading,navigate);
    }
  };

  return (
    <>
     {
      loading ? (<Loading />) :  (
        <>
        <form className={s.form} onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div className={s.container} key={index} style={{ marginBottom: '20px' }}>
            <div className={s.question}>
              <label className={s.queslabel} htmlFor={`question-${index}`}>Question {index + 1}</label>
              <input
                className={s.quesinput}
                type="text"
                id={`question-${index}`}
                name={`question-${index}`}
                value={q.question}
                onChange={(e) => handleChange(index, -1, e)} // Pass -1 for questions
                required
              />
            </div>
            <div className={s.options}>
              {q.options.map((option, optionIndex) => (
                <div className={s.option} key={option.key}>
                  <label className={s.optionlabel} htmlFor={`option-${index}-${option.key}`}>Option {option.key}</label>
                  <input
                    className={s.optioninput}
                    type="text"
                    id={`option-${index}-${option.key}`}
                    name={`option-${index}-${option.key}`}
                    value={option.ans}
                    onChange={(e) => handleChange(index, optionIndex, e)} // Pass optionIndex for options
                    required
                  />
                </div>
              ))}
            </div>
            <div className={s.correctanswer}>
              <label className={s.correctlabel} htmlFor={`correctAnswer-${index}`}>Correct Answer</label>
              <select
                className={s.correctinput}
                id={`correctAnswer-${index}`}
                name="correctAnswer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(index, -1, e)} // Pass -1 for correctAnswer
                required
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((option, optionIndex) => (
                  <option key={option.key} value={option.key}>{option.key}</option>
                ))}
              </select>
            </div>
            <div className={s.marks}>
              <label className={s.markslabel} htmlFor={`marks-${index}`}>Marks</label>
              <input
                className={s.marksinput}
                type="number"
                id={`marks-${index}`}
                name="marks"
                value={q.marks}
                onChange={(e) => handleChange(index, -1, e)} // Pass -1 for marks
                required
              />
            </div>
            <button className={s.deletebtn} type="button" onClick={() => deleteQuestion(index)}>Delete</button>
          </div>
        ))}
        <div className={s.btns}>
          <button className={s.addquesbtn} type="button" onClick={addQuestion}>
            Add Question
          </button>
          <button className={s.submitbtn} type="submit">Submit</button>
        </div>
      </form>
        </>
      )
     }
    </>
  );
};

export default QuestionAdd;
