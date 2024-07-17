import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { FaEye } from "react-icons/fa";


const   StudentTable = ({data , index }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className="colHeader DataNumber">1</div>
            <div className="colHeader">TTitle</div>
            <div className="colHeader">SubID</div>
            <div className="colHeader">SubNAme</div>
            <div className="colHeader">12</div>
            <div className="colHeader">12</div>
            <div className="colHeader"><FaEye /></div>
            
        </>
    )
}

export default StudentTable