import React, { useEffect, useState, useRef } from "react";
import DataTable from "../../Components/Datatable/DataTable";
import { fetchQuesList } from "../../services/operation/quiz";
import EditDescription from "../../Components/Edit/EditDescription"
import './QuizList.css'

const QuizList = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    const [showEditModal, setEditModal] = useState(false);
    const openEditModal = () => setEditModal(true);


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
                            <DataTable userData={userData} id={"admin"} openEditModal={openEditModal}  />
                        </div>
                    )}
                </>
            )}

           {showEditModal && <EditDescription setEditModal={setEditModal}  />}
        </div>
    );
};

export default QuizList;
