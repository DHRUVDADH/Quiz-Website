import React, { useState } from 'react'
import s from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signUp } from '../../services/operation/authApi';
import Loading from "../../Components/Loading/Loading"
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [loading , setLoading] = useState();
  const [data, setData] = useState({
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    usertype: "",
    student_id: "",
  })

  const handleType = (type)=>{
    setData({
      ...data,
      usertype: type
    })
  }
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const validate = ()=>{

    if(data.email.trim()=='' || data.password.trim()=="" || data.firstname.trim()=="" || data.lastname.trim()=="" || data.usertype.trim()=="" || data.student_id.trim()==""){
      return true
    }
    return false;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.error("Please Fill All the Fieldfs")
      return;
    }
    signUp(data.firstname,
      data.lastname,
      data.usertype,
      data.student_id,
      data.password,
      data.email,setLoading,navigate)
  }


  return (
    <div className={`${s.main} flex-center`}>
      <div className={`flex-center ${s.cont1}`}>
      <Link to="/">
          <div className={`hover ${s.sub1}`}>
            <img src="./Assets/Charusat-Logo.png" />
          </div>
        </Link>
        <div className={s.sub2}>Continue your learning journey with Charusat</div>
       {
        loading ? (<Loading />) : (
          <>
             <div className={`${s.sub3} flex-center`}>
          <div className={data.usertype=="faculty" ? (`hover ${s.item} selected`) : (`hover ${s.item}`)} onClick={() => handleType("faculty")}>
            <div className={s.icon}>
              <img src="./Assets/tutor.svg" />
            </div>
            <div className={s.text}>Sign in as a faculty</div>
          </div>
          <div className={data.usertype=="student" ? (`hover ${s.item} selected`) : (`hover ${s.item}`)} onClick={() => handleType("student")} >
            <div className={s.icon}>
              <img src="./Assets/student.svg" />
            </div>
            <div className={s.text}>Sign in as a Student</div>
          </div>
          <div className={`hover ${s.item}`} onClick={() => navigate('/login')}>
            <div className={s.icon}>
              <img src="./Assets/signup.svg" />
            </div>
            <div className={s.text}>Login  </div>
          </div>
        </div>
        <form className={s.sub4} onSubmit={submitHandler}>
          <div className={s.item}>
            <label htmlFor="fname">Your first name</label>
            <div><img src='./Assets/mail.svg' ></img>
              <input type="fname" id='fname' className={s.input} placeholder='Type your first name' name='firstname' onChange={handleChange} value={data.firstname} /></div>
          </div>
          <div className={s.item}>
            <label htmlFor="lname">Your last name</label>
            <div><img src='./Assets/mail.svg' ></img>
              <input type="lname" id='lname' className={s.input} placeholder='Type your last name' name='lastname' onChange={handleChange} value={data.lastname} /></div>
          </div>
          <div className={s.item}>
            <label htmlFor="email">Registered email address</label>
            <div><img src='./Assets/mail.svg' ></img>
              <input type="email" id='email' className={s.input} placeholder='Type your email' name='email' onChange={handleChange} value={data.email} /></div>
          </div>
          <div className={s.item}>
            <label htmlFor="id">Student ID</label>
            <div><img src='./Assets/id.svg' ></img>
              <input type="text" id='id' className={s.input} placeholder='Type your ID' name='student_id' onChange={handleChange} value={data.student_id} /></div>
          </div>
          <div className={s.item}>
            <label htmlFor="password">Password</label>
            <div><img src='./Assets/key.svg' ></img>
              <input type="text" id='password' className={s.input} placeholder='Type your password' name='password' onChange={handleChange} value={data.password}  /></div>
          </div>
          <div className={s.submit}>
            <button className='hover' type='submit'>Sign In</button>
            <div className={`flex-center ${s.wrap}`}>
              <div className={s.first}>Forgot Password?</div>
              <div className={`hover ${s.second}`}>click here</div>
            </div>
          </div>
        </form>
          </>
        )
       }
      </div>
      <div className={`flex-center ${s.cont2}`}>
        <img src="./Assets/loginimage.png" />
      </div>
    </div>
  )
}

export default Signup