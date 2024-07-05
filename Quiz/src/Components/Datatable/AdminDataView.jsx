import React from 'react'

import { useDispatch } from 'react-redux'

const   AdminDataView = ({data , index }) => {
    const dispatch = useDispatch();
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
            <div className="colHeader">Action</div>
            
        </>
    )
}

export default AdminDataView