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
            <div className="colHeader">NAme</div>
            <div className="colHeader">22DIT022</div>
            <div className="colHeader">10</div>
            <div className="colHeader">{"2024-06-23T17:14:45.110+00:00".split("T")[0] } - {"2024-06-23T17:14:45.110+00:00".split("T")[1].split("+")[0].split(".")[0]}</div>
            <div className="colHeader"><Link to="/faculty/:resultID/result"><FaEye className='icon-large'/></Link></div>
        </>
    )
}

export default ResultView