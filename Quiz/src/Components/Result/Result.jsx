import React, { useEffect, useState, useRef } from "react";
import ResultTable from "../ResultTable/ResultTable";
import { fetchQuesList } from "../../services/operation/quiz";

import './Result.css'

const Result = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    useEffect(()=>{
        fetchQuesList(setLoading,setUserData)
    },[])

    return (
        <div className="studentDashboard">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {userData == null ? (
                        <h1>Data Not Found</h1>
                    ) : (
                        <div className="dataTable-container">
                            <ResultTable userData={userData} id={"admin"}   />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default Result