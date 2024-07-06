import React from 'react';
import styles from './QuizDetails.module.css';

const QuizDetails = ({ subName, subID, quizID, totalQuestions, totalMarks }) => {
  return (
    <div className={styles.quizDetails}>
      <p>Subject Name: <span className={styles.quizInputs}>{subName}</span></p>
      <p>Subject ID: <span className={styles.quizInputs}>{subID}</span> </p>
      <p>Quiz ID: <span className={styles.quizInputs}>{quizID}</span></p>
      <p>Total Questions: <span className={styles.quizInputs}>{totalQuestions}</span></p>
      <p>Total Marks: <span className={styles.quizInputs}>{totalMarks}</span></p>
    </div>
  );
};

export default QuizDetails;
