import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const   ResultView = ({data , index }) => {

    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.name}</div>
            <div className="colHeader">{data.student_id}</div>
            <div className="colHeader">{data.earnedMarks}</div>
            <div className="colHeader">{data.createdAt.split("T")[0] } - {data.createdAt.split("T")[1].split("+")[0].split(".")[0]}</div>
            <div className="colHeader"><Link to="/faculty/:resultID/detaildresult"><FaEye className='icon-large'/></Link></div>
        </>
    )
}

export default ResultView