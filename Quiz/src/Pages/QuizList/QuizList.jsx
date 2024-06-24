import React, { useEffect, useState, useRef } from "react";
import DataTable from "../../Components/Datatable/DataTable";
import useOnClickOutside from "../../customHooks/useOnClickOutside"
import {application} from "../../lib/data";
import './QuizList.css'

const QuizList = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(application.application);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    // Event handler for clicking outside the popup
    useOnClickOutside(ref, () => setOpen(false));

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
                            <DataTable userData={userData} id={"admin"} setOpen={setOpen} />
                        </div>
                    )}
                </>
            )}

          
        </div>
    );
};

export default QuizList;
