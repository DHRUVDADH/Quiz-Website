import React from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";


const   StudentTable = ({data}) => {

    return (
        <>
            <div className="colHeader DataNumber">1</div>
            <div className="colHeader">{data.title}</div>
            <div className="colHeader">{data.subId}</div>
            <div className="colHeader">{data.subName}</div>
            {/* <div className="colHeader">{data.updatedAt.split('T')[0]} {data.updatedAt.split('T')[1].split('+')[0]} </div> */}
             <div className="colHeader">Date</div>
            <div className="colHeader">{data.earnmarks || '-'}</div>
            <div className="colHeader"><Link to={`/student/${data._id}/detaildresult`}><FaEye className='icon-large'/></Link></div>
            
        </>
    )
}

export default StudentTable