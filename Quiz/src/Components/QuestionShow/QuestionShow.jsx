import React, { useState } from 'react';
import styles from './QuestionShow.module.css';

const QuestionShow = () => {
  const questions = [
    {
      id: "q1",
      question: "What is the capital of France?",
      options: [
        { key: "a", ans: "Berlin" },
        { key: "b", ans: "Madrid" },
        { key: "c", ans: "Paris" },
        { key: "d", ans: "Lisbon" }
      ],
      correctAnswer: "c",
      marks: "1"
    },
    {
      id: "q2",
      question: "What is the sum of 2 and 3?",
      options: [
        { key: "a", ans: "3" },
        { key: "b", ans: "4" },
        { key: "c", ans: "5" },
        { key: "d", ans: "6" }
      ],
      correctAnswer: "c",
      marks: "1"
    },
    {
      id: "q3",
      question: "Which planet is known as the Red Planet?",
      options: [
        { key: "a", ans: "Earth" },
        { key: "b", ans: "Mars" },
        { key: "c", ans: "Jupiter" },
        { key: "d", ans: "Saturn" }
      ],
      correctAnswer: "b",
      marks: "1"
    }
  ];

  const totalMarks = questions.reduce((acc, q) => acc + parseInt(q.marks), 0);

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex, optionKey) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionKey;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (selectedOptions[index] === q.correctAnswer) {
        newScore += parseInt(q.marks);
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div className={styles.quizContainer}>
      <h1 className={styles.quizTitle}>Quiz Title</h1>
      <div className={styles.quizInfo}>
        <p className={styles.totalQuestions}>Total Questions: {questions.length}</p>
        <p className={styles.totalMarks}>Total Marks: {totalMarks}</p>
      </div>
      {questions.map((q, questionIndex) => (
        <div key={q.id} className={styles.questionBlock}>
          <h2 className={styles.question}>{questionIndex + 1}. {q.question}</h2>
          <ul className={styles.optionsList}>
            {q.options.map(option => (
              <li key={option.key} className={styles.option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option.key}
                    checked={selectedOptions[questionIndex] === option.key}
                    onChange={() => handleOptionChange(questionIndex, option.key)}
                  />
                  {option.ans}
                </label>
              </li>
            ))}
          </ul>
          <p className={styles.marks}>Marks: {q.marks}</p>
        </div>
      ))}
      <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
      {showResults && <div className={styles.results}>Your score: {score}</div>}
    </div>
  );
};

export default QuestionShow;
