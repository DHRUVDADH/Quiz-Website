import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/TopNavbar/Navbar'
import StudentTable from "../../Components/StudentTable/DataTable"
import "./StudentDashboard.css"
import { fetchStudentDashboard } from '../../services/operation/student'
const StudentDashboard = () => {
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState([]);
  useEffect(()=>{
    fetchStudentDashboard(setLoading,setData);
  },[])
  return (
    <div className='outerCenter'>
        <Navbar />
      <div className='fullScreen'>
        <div className='outletSection'>
          <h1>Welcome, Nishant</h1>
          <div className="dataTable-container">
            <StudentTable />
          </div>
        </div>
    </div>
    </div>
  )
}

export default StudentDashboard