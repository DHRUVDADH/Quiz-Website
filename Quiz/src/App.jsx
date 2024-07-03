import React from 'react'
import {Routes , Route} from 'react-router-dom'

import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import Tutor from './Pages/TutorDash/Tutor'
import QuestionAdd from './Components/QuestionAdd/QuestionAdd'
import OpenRoute from './Components/Auth/OpenRoute'
import QuizList from './Pages/QuizList/QuizList'

import './App.css'
import FacultyRoute from './Components/Auth/FacultyRoute'
import StudentRoute from './Components/Auth/StudentRoute'
import QuestionShow from './Components/QuestionShow/QuestionShow'

const App = () => {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/resetpassword" element={<OpenRoute><ResetPassword /></OpenRoute>} />
        
        <Route path="/faculty" element={<FacultyRoute><Tutor /></FacultyRoute>} >
          <Route path="/faculty" element={<QuizList />} />
          <Route path="/faculty/:quizID/addquestion" element={<QuestionAdd />} />
        </Route>

        <Route path="/quiz/:quizID" element={<QuestionShow/>} />

        <Route path='*' element={<h1>Page Not Found</h1>} />

      </Routes>
    </div>
  )
}

export default App




