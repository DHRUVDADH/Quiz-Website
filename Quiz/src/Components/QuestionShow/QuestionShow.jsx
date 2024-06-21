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
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleOptionChange = (questionIndex, optionKey) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionKey;
    setSelectedOptions(newSelectedOptions);
  };

  return (
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
    </div>
  );
};

export default QuestionShow;
