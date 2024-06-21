import React from 'react'
import Navbar from '../../Components/TopNavbar/Navbar'
import './Home.css'
const Home = () => {
  return (
    <>
    <Navbar />
      <section className="header">
        <div className="text-box">
          <h1>Charusat University</h1>
          <p>
            Making Website is now one of the easiest thing in the world. <br />
            You just need to learn HTML, CSS, Javascript and you are good to go.
          </p>
          <a href="https://www.charusat.ac.in/" target="blank" className="hero-btn">
            Visit Us to Know More
          </a>
        </div>
      </section>
    </>
  )
}

export default Home