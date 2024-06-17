import React from 'react'
import Login from './Pages/Login/Login'
import './App.css'
import Signup from './Pages/SignUp/Signup'
import NavbarTutor from './Components/NavbarTutor/NavbarTutor'
import TutorDashboard from './Pages/TutorDashboard/TutorDashboard'
import ResetPassword from './Pages/ResetPassword/ResetPassword'

const App = () => {
  return (
    <div className='mainContainer'>
      <div><TutorDashboard/></div>
    </div>
  )
}

export default App