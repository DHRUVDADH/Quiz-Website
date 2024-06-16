import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { Link } from 'react-router-dom';



const ResetPassword = () => {
  const [reset, setReset] = useState(true);


  return (
    <>
      {reset ?
        (
          <div className={styles.mainDiv7}>
            <div className={styles.content}>
              <div className={styles.cont1}>
                <img src="/Assets/resetpassword-page-1.png" alt="image" />
              </div>
              <div className={styles.cont2}>
                <div className={styles.item1}>Check Email</div>
                <div className={styles.item2}>we have sent the reset email to username@gmail.com</div>

                <div className={styles.item3}>
                  <button  type='submit'>Reset Email</button>
                </div>
                <div onClick={()=>{setReset(false)}} className={styles.item4}>
                  <img src="./Assets/backarrow.svg" />
                  <div >Back</div>
                </div>
              </div>
            </div>
          </div>
        ) :
        (
          <div className={styles.main}>
            <div className={styles.content}>
              <div className={styles.cont1}>
                <img src="/Assets/resetpassword-page-1.png" alt="image" />
              </div>
              <form className={styles.cont2} >
                <div className={styles.item1}  >Reset your password</div>
                <div className={styles.item2}>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
                <div className={styles.item3}>
                  <input type='email' placeholder='email address' id='email' />
                </div>
                <div className={styles.item4}>
                  <button Onclick={()=>{ setReset(true)}} type='submit'>Submit</button>
                </div>
                <div className={styles.item5}>
                  <img src="./Assets/backarrow.svg" />
                  <div>Back to Login</div>
                </div>
              </form>
            </div>
          </div>
        )

      }
    </>
  )

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.cont1}>
          <img src="/Assets/resetpassword-page-1.png" alt="image" />
        </div>
        <form className={styles.cont2} >
          <div className={styles.item1}  >Reset your password</div>
          <div className={styles.item2}>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
          <div className={styles.item3}>
            <input type='email' autoComplete='username' placeholder='email address' id='email' />
          </div>
          <div className={styles.item4}>
            <button type='submit'>Submit</button>
          </div>
          <div className={styles.item5}>
            <img src="./Assets/backarrow.svg" />
            <div>Back to Login</div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword