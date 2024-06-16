import React, { useState } from 'react'
import s from './Login.module.css'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const [data , setData] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const submitHandler = (e)=>{
    e.preventDefault();

    if(data.email=="" || data.password==""){
      toast.error("Please Fill All the Fieldfs")
      return;
    }
  }

  return (
    <div className={`${s.main} flex-center`}>
      <div className={`flex-center ${s.cont1}`}>
        <div className={`hover ${s.sub1}`}>
          <img src="./Assets/Charusat-Logo.png" />
        </div>
        <div className={s.sub2}>Continue your learning journey with Charusat</div>
        <div className={`${s.sub3} flex-center`}>
          <div className={`hover ${s.item}`}>
            <div className={s.icon}>
              <img src="./Assets/tutor.svg" />
            </div>
            <div className={s.text}>Sign in as a Tutor</div>
          </div>
          <div className={`hover ${s.item}`}  onClick={()=>console.log('Clicked')}>
            <div className={s.icon}>
              <img src="./Assets/student.svg" />
            </div>
            <div className={s.text}>Sign in as a Student</div>
          </div>
          <div className={`hover ${s.item}`} onClick={()=>navigate('/signup')}>
            <div className={s.icon}>
              <img src="./Assets/signup.svg" />
            </div>
            <div className={s.text}>Create Account </div>
          </div>
        </div>
        <form className={s.sub4} onSubmit={submitHandler}>
          <div className={s.item}>
            <label htmlFor="email">Registered email address</label>
            <div><img src='./Assets/mail.svg' ></img>
              <input type="email" id='email' className={s.input} placeholder='Type your email'  name='email' onChange={handleChange} value={data.email} required /></div>
          </div> 
          <div className={s.item}>
            <label htmlFor="password">Password</label>
            <div><img src='./Assets/key.svg' ></img>
              <input type="text" id='password' className={s.input} placeholder='Type your password' name='password' onChange={handleChange} value={data.password} required /></div>
          </div>
          <div className={s.submit}>
            <button className='hover' type='submit'>Sign In</button>
            <div className={`flex-center ${s.wrap}`}>
            <Link to="/resetpassword" className='none'><div className={s.first}>Forgot Password?</div></Link>
            </div>
          </div>
        </form>
      </div>
      <div className={`flex-center ${s.cont2}`}>
        <img src="./Assets/loginimage.png" />
      </div>
    </div>
  )
}

export default Login