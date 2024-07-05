import React, { useEffect, useState, useRef } from "react";
import ResultTable from "../ResultTable/ResultTable";
import { fetchResults } from "../../services/operation/quiz";

import './Result.css'
import { useParams } from "react-router-dom";

const Result = () => {
    const {quizID} = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    useEffect(()=>{
        fetchResults(quizID,setLoading,setUserData)
    },[])

    return (
        <div className="studentDashboard">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {(userData == null)||(userData.length == 0) ? (
                        <h1>Data Not Found</h1>
                    ) : (
                        <div className="dataTable-container">
                            <ResultTable userData={userData}  />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default Result