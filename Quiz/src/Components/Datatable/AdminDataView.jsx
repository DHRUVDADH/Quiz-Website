import React from 'react'
import { MdPendingActions } from "react-icons/md";
import Menu from './Menu';
import { downloadData } from '../../lib/data';

import { useDispatch } from 'react-redux'

const   AdminDataView = ({data , index , setOpen}) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.quizName}</div>
            <div className="colHeader">{data.subjectId}</div>
            <div className="colHeader">{data.subjectName}</div>
            <div className="colHeader">{"2024-06-23T17:14:45.110+00:00".split("T")[0] } - {"2024-06-23T17:14:45.110+00:00".split("T")[1].split("+")[0].split(".")[0]}</div>
            <div className="colHeader">{data.marks}</div>
            <div className="colHeader">{data.questions}</div>
            <div className="colHeader">{data.responses}</div>
            <div className="colHeader">Action</div>
            
        </>
    )
}

export default AdminDataView