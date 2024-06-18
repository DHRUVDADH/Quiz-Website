import React, { useState } from 'react';
import s from './QuestionAdd.module.css'

const QuestionAdd = () => {
  const initialQuestionCount = 3; // Initial number of questions
  const [questions, setQuestions] = useState(
    Array.from({ length: initialQuestionCount }, () => ({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }))
  );

  const addQuestion = () => {
    const newQuestions = [...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }];
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    if (name.startsWith('option-')) {
      const optionIndex = parseInt(name.split('-')[2]);
      newQuestions[index].options[optionIndex] = value;
    } else if (name === 'correctAnswer') {
      newQuestions[index].correctAnswer = value;
    } else {
      newQuestions[index].question = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with questions array
    console.log(questions);
  };

  return (
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
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className={s.options}>
              {q.options.map((option, optionIndex) => (
                <div className={s.option} key={optionIndex}>
                  <label className={s.optionlabel} htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                  <input
                    className={s.optioninput}
                    type="text"
                    id={`option-${index}-${optionIndex}`}
                    name={`option-${index}-${optionIndex}`}
                    value={option}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
              ))}
            </div>
            <div className={s.correctanswer}>
              <label className={s.correctlabel} htmlFor={`correctAnswer-${index}`}>Correct Answer</label>
              <input
                className={s.correctinput}
                type="text"
                id={`correctAnswer-${index}`}
                name="correctAnswer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(index, e)}
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
  );
};

export default QuestionAdd;
