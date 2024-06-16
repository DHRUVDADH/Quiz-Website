import React, { useState } from 'react'
import s from './QuizModal.module.css'

const QuizModal = ({ closeModal }) => {
  const randomCode = "AAAA1111";
  const [codeModal, setCodeModal] = useState();
  const closeCodeModal = () => { setCodeModal(false) };

  const [size, setSize] = useState(5);
  const arr = [];
  arr.length = size;


  return (
    <div className={s.main}>
      {codeModal ? (
        <div className={s.container2}>
          <div className={s.sub1}><img src="./Assets/popuptick.svg" /></div>
          <div className={s.sub2}>
            <div className={s.child1}>Quiz was successfully created</div>
            <div className={s.child2}>
              <div className={s.item1}>CODE:</div>
              <div className={s.item2}>{randomCode}</div>
            </div>
          </div>
          <button onClick={closeCodeModal} className={s.sub3}>Close</button>
        </div>
      ) : (
        <form className={s.container1}>
          <div className={s.cont1}>
            <div className={s.sub1}>Set up a new quiz</div>
            <button type='submit' onClick={() => { setCodeModal(true) }} className={s.sub2}><img src="./Assets/Savearrow.svg" /></button>
            <button className={s.sub3} onClick={closeModal}><img src="./Assets/Closecross.svg" /></button>
          </div>
          <div className={s.cont2}>
            <div className={s.heading}>Details</div>
            <div className={s.content}>
              <div className={s.child}>
                <label className={s.label} htmlFor="title">Title</label>
                <input type="text" id='title' className={s.input} />
              </div>
              <div className={s.child}>
                <label htmlFor="duration">Duration(in min)</label>
                <select id='duration' className={s.input}>
                  <option value="1">5</option>
                  <option value="1">10</option>
                  <option value="1">15</option>
                  <option value="1">20</option>
                  <option value="1">25</option>
                  <option value="1">30</option>
                  <option value="1">35</option>
                  <option value="1">40</option>
                  <option value="1">45</option>
                  <option value="1">50</option>
                  <option value="1">55</option>
                  <option value="1">60</option>
                </select>
              </div>
              <div className={s.child}>
                <label htmlFor="questions">No. of questions</label>
                <select id='questions' className={s.input}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className={s.child}>
                <label htmlFor="marks">Score per question</label>
                <input type="number" id='marks' className={s.input} />
              </div>
              <div className={s.child}>
                <label htmlFor="desc">Description</label>
                <textarea type="text" id='desc' className={s.input} />
              </div>
              <div className={s.child}>
                <label htmlFor="date">Schedule</label>
                <input type="date" id='date' className={s.input} />
              </div>
              <div className={s.child}>
                <label htmlFor="time">Start Time</label>
                <input type="time" id='time' className={s.input} />
              </div>
            </div>
          </div>
          <div className={s.cont3}></div>
        </form>
      )}
    </div>
  )
}

export default QuizModal