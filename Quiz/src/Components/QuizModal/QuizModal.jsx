import React, { useState } from 'react'
import s from './QuizModal.module.css'
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify'
<<<<<<< HEAD
import QuestionAdd from '../QuestionAdd/QuestionAdd';
=======
import { careteQuiz } from "../../services/operation/quiz"
>>>>>>> 68c5eafe784c0ec8bf14c97cbffbf8c4fe8562a0

const QuizModal = ({ closeModal }) => {

  const [codeModal, setCodeModal] = useState();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    title: '',
    durationInMins: 15,
    noOfQuestion: 5,
    totalmarks: 1,
    description: '',
    date: '',
    time: '',
    subId:'',
    subName:''
  })

  const closeCodeModal = () => { setCodeModal(false) };

  const validateForm = (formData) => {

    // Title validation (required field)
    if (!formData.title.trim()) {
      toast.error("Tittle is required")
      return false;
    }

    // Duration validation (required field, must be a positive integer)
    const duration = parseInt(formData.durationInMins);
    if (isNaN(duration) || duration <= 0) {
      toast.error("Duration must be a positive number")
      return false;
    }

    // Number of questions validation (required field, must be a positive integer)
    const numQuestions = parseInt(formData.noOfQuestion);
    if (isNaN(numQuestions) || numQuestions <= 0) {
      toast.error("Number of questions must be a positive number")
      return false;

    }

    // Score per question validation (required field, must be a positive integer)
    const totalmarks = parseInt(formData.totalmarks);
    if (isNaN(totalmarks) || totalmarks <= 0) {
      toast.error("Score per question must be a positive number")
      return false;
    }

    if (!formData.subId.trim()) {
      toast.error("Subject Id Required")
      return false;
    }

    if (!formData.subName.trim()) {
      toast.error("Subject Name is Required")
      return false;
    }

    // Description validation (optional, but if provided, must not be empty)
    if (formData.description.trim() === '') {
      toast.error("Description cannot be empty")
      return false;
    }

    // Date validation (required field, must be a valid date)
    const eventDate = new Date(formData.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set current time to midnight for comparison
    if (isNaN(eventDate.getTime())) {
      toast.error("Invalid date")
      return false;
    } else if (eventDate < now) {
      toast.error("Date must be today or in the future")
      return false;
    }

    // Time validation (required field, must be a valid time)
    const eventTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!formData.time.match(eventTimeRegex)) {
      errors.time = "Invalid time format (HH:mm)";
      toast.error("Tittle is required")
      return false;
    } else {
      const selectedTime = formData.time.split(':');
      const selectedHour = parseInt(selectedTime[0]);
      const selectedMinute = parseInt(selectedTime[1]);


      if (eventDate.getDate() === now.getDate()) {
        const now2 = new Date();
        const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
        const currentInMinutes = now2.getHours() * 60 + now2.getMinutes();
        const timeDifference = selectedTimeInMinutes - currentInMinutes;
        console.log(selectedTimeInMinutes, currentInMinutes)

        if (timeDifference <= 10) {
          toast.error("Time must be at least 10 minutes from now")
          return false;
        }
      }
    }

    return true;
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm(data)) {
      toast.success("Got Through Validation");
      careteQuiz(data.time , data.durationInMins , data.noOfQuestion , data.totalmarks , data.description , data.date , data.time , data.subId , data.subName , setLoading , setCodeModal);
      return ;
    }
  }


  return (
    <div className={s.main}>
      <>
        {codeModal ? (
          <div className={s.container2}>
            <div className={s.sub1}><img src="./Assets/popuptick.svg" /></div>
            <div className={s.sub2}>
              <div className={s.child1}>Quiz was successfully created</div>
            </div>
            <button onClick={() => { closeCodeModal(); closeModal(); }} className={s.sub3}>Close</button>
          </div>
        ) : (
          <form className={s.container1} onSubmit={submitHandler}>
            {
              loading ? (<Loading />) : (
                <>
                  <div className={s.cont1}>
                    <div className={s.sub1}>Set up a new quiz</div>
                    <button type='submit' onClick={() => { time }} className={s.sub2}><img src="./Assets/Savearrow.svg" /></button>
                    <button className={s.sub3} onClick={closeModal}><img src="./Assets/Closecross.svg" /></button>
                  </div>
                  <div className={s.cont2}>
                    <div className={s.heading}>Details</div>
                    <div className={s.content}>
                      <div className={s.child}>
                        <label className={s.label} htmlFor="title">Title</label>
                        <input type="text" id='title' name='title' onChange={changeHandler} value={data.title} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="duration">Duration(in min)</label>
                        <input type='number' id='duration' name='durationInMins' onChange={changeHandler} value={data.durationInMins} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="questions">No. of questions</label>
                        <input type="number" id='questions' name='noOfQuestion' onChange={changeHandler} value={data.noOfQuestion} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="marks">Total Score</label>
                        <input type="number" id='marks' name='totalmarks' onChange={changeHandler} value={data.totalmarks} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="subid">Subject Id</label>
                        <input type="number" id='subid' name='subId' onChange={changeHandler} value={data.subId} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="subname">Subject Name</label>
                        <input type="text" id='subname' name='subName' onChange={changeHandler} value={data.subName} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="desc">Description</label>
                        <textarea type="text" id='desc' name='description' onChange={changeHandler} value={data.description} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="date">Schedule</label>
                        <input type="date" id='date' name='date' onChange={changeHandler} value={data.date} className={s.input} />
                      </div>
                      <div className={s.child}>
                        <label htmlFor="time">Start Time</label>
                        <input type="time" id='time' name='time' onChange={changeHandler} value={data.time} className={s.input} />
                      </div>
                    </div>
                  </div>
                  <div className={s.cont3}>
                    <QuestionAdd></QuestionAdd>
                  </div>
                </>
              )
            }
          </form>
        )}
      </>


    </div>
  )
}

export default QuizModal