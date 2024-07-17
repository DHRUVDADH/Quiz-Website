import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/TopNavbar/Navbar'
import StudentTable from "../../Components/StudentTable/DataTable"
import "./StudentDashboard.css"
import { fetchStudentDashboard } from '../../services/operation/student'
import { useSelector } from 'react-redux'
const StudentDashboard = () => {
  const [loading,setLoading] = useState(false);
  const [userData,setData] = useState([]);
  const {user} = useSelector(state => state.profile)
  
  useEffect(()=>{
    fetchStudentDashboard(setLoading,setData);
  },[])
  return (
    <div className='outerCenter'>
        <Navbar />
      <div className='fullScreen'>
        <div className='outletSection'>
          <h1>Welcome, {user.firstname}</h1>
          <div className="dataTable-container">
          {
            userData.length == 0 ? (<h1>No data Found</h1>) : (<StudentTable userData={userData}/>)
          }
            
          </div>
        </div>
    </div>
    </div>
  )
}

export default StudentDashboard