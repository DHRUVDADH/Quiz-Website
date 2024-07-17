import React from 'react'

import { FaEye } from "react-icons/fa";


const   StudentTable = ({data}) => {

    return (
        <>
            <div className="colHeader DataNumber">1</div>
            <div className="colHeader">{data.title}</div>
            <div className="colHeader">{data.subId}</div>
            <div className="colHeader">{data.subName}</div>
            <div className="colHeader">{data.updatedAt.split('T')[0]} {data.updatedAt.split('T')[1].split('+')[0]} </div>
            <div className="colHeader">{data.earnmarks || '-'}</div>
            <div className="colHeader"><FaEye /></div>
            
        </>
    )
}

export default StudentTable