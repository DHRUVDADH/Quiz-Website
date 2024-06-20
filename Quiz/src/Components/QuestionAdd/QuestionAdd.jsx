import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './QuestionAdd.module.css';

const QuestionAdd = () => {
  const initialQuestionCount = 3;
  const initialQuestions = JSON.parse(localStorage.getItem('questions')) ||
    Array.from({ length: initialQuestionCount }, () => ({
      id: uuidv4(),
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

  const [questions, setQuestions] = useState(initialQuestions);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = () => {
    const newQuestions = [...questions, {
      id: uuidv4(), question: '', options: [
        { key: 'A', ans: '' },
        { key: 'B', ans: '' },
        { key: 'C', ans: '' },
        { key: 'D', ans: '' }
      ], correctAnswer: '', marks: ''
    }];
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
  );
};

export default QuestionAdd;
