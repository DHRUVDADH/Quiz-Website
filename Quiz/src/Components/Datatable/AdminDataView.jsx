import React,{useState} from 'react'
import Menu from '../Menu/Menu';
import { IoSettingsOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import EditDescription from '../Edit/EditDescription';

const   AdminDataView = ({data , index }) => {
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
            <div className="colHeader">{data.title}</div>
            <div className="colHeader">{data.subId}</div>
            <div className="colHeader">{data.subName}</div>
            <div className="colHeader">{"2024-06-23T17:14:45.110+00:00".split("T")[0] } - {"2024-06-23T17:14:45.110+00:00".split("T")[1].split("+")[0].split(".")[0]}</div>
            <div className="colHeader">{data.totalmarks}</div>
            <div className="colHeader">{data.noOfQuestion}</div>
            <div className="colHeader ">2</div>
            <div className="colHeader"><Menu data={quizSetting} quizID={data._id} icon={<IoSettingsOutline className='icon-large'/>}/></div>
            
        {showEditModal && <EditDescription setEditModal={setEditModal} quizID={data._id}  />}

        </>
    )
}

export default AdminDataView