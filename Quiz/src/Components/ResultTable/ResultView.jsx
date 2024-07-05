import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

const   ResultView = ({data , index }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

        const [showEditModal, setEditModal] = useState(false);
    const closeEditModal = () => setEditModal(false);
    const openEditModal = () => setEditModal(true);

    const quizSetting = [
        {
            name: "Add Question",
            function: (quizID) => navigate(`/faculty/${quizID}/addquestion`),
        },
        {
            name: "Edit Details",
            function: (quizID) => openEditModal(),
        },
        {
            name: "Result",
            function: (quizID) => (quizID , "conferenceAcceptance"),
        },
        {
            name: "Copy URL",
            function: (quizID) => {copy(`localhost:5173/quiz/${quizID}`); toast.success("Copied!")},
        }
    ]
    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.name}</div>
            <div className="colHeader">{data.student_id}</div>
            <div className="colHeader">{data.earnedMarks}</div>
            <div className="colHeader">{data.createdAt.split("T")[0] } - {data.createdAt.split("T")[1].split("+")[0].split(".")[0]}</div>
            <div className="colHeader"><Link to="/faculty/:resultID/result"><FaEye className='icon-large'/></Link></div>
        </>
    )
}

export default ResultView