import React from 'react';
import styles from './QuizDetails.module.css';

const QuizDetails = ({ subName, subID, quizID, totalQuestions, totalMarks }) => {
  return (
    <div className={styles.quizDetails}>
      <p>Subject Name: {subName}</p>
      <p>Subject ID: {subID}</p>
      <p>Quiz ID: {quizID}</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Total Marks: {totalMarks}</p>
    </div>
  );
};

export default QuizDetails;
