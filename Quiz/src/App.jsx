import React from 'react'
import {Routes , Route} from 'react-router-dom'

import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
import NavbarTutor from './Components/NavbarTutor/NavbarTutor'
import TutorDashboard from './Pages/TutorDashboard/TutorDashboard'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import mySvg from "../public/Assets/tutor.svg"

import './App.css'

const App = () => {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App