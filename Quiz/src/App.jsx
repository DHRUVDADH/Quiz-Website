import React from 'react'
import {Routes , Route} from 'react-router-dom'

import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
import NavbarTutor from './Components/NavbarTutor/NavbarTutor'
import TutorDashboard from './Pages/TutorDashboard/TutorDashboard'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import OpenRoute from './Components/Auth/OpenRoute'
import FacultyRoute from './Components/Auth/FacultyRoute'

import './App.css'
import StudentRoute from './Components/Auth/StudentRoute'
import QuestionAdd from './Components/QuestionAdd/QuestionAdd'

const App = () => {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/resetpassword" element={<OpenRoute><ResetPassword /></OpenRoute>} />
        
        <Route path="/faculty" element={<FacultyRoute><TutorDashboard /></FacultyRoute>} >
          <Route path="/faculty" element={<QuestionAdd />} />
          <Route path="/faculty/dhruv" element={<>I AM Dhruv</>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App