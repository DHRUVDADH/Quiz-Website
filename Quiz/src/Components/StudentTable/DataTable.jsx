import React, { useEffect, useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import AdminDataView from "./StudentTable";
import { useNavigate } from "react-router-dom"
import Filter from './Filter';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

const DataTable = ({ userData }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(userData);
    const navigate = useNavigate();

    useEffect(() => {
        let filtered = userData;

        if (searchQuery) {
            filtered = filtered.filter(data =>
                data.paperTitle.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [searchQuery,userData]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setSpecificDate("");
    };



    return (
        <div className="DataTable-parant-Container">
            <div className="header-row">
                Applications
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search"
                        id="searchInput"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <MdOutlineFilterAltOff className="iconBigger" />
                </div>
            </div>
            <div className="data-table-inner">
                <div className="header-title-row">
                    <div className="colHeader DataNumber">Number</div>
                    <div className="colHeader">
                        Quiz Title
                    </div>
                    <div className="colHeader">Subject ID  </div>
                    <div className="colHeader">Subject ID  </div>
                    <div className="colHeader">Date&Time</div>
                    <div className="colHeader">Marks</div>
                    <div className="colHeader">Action</div>
                </div>


                {
                    (filteredData.length == 0 || filteredData==null) ? (<h1>No data Found</h1>) : (
                        <>
                            {
                                filteredData.map((data) => (
                                    <div className="row-content" >
                                        <AdminDataView data={data} />
                                    </div>))
                            }
                        </>
                    )
                }
            </div>

        </div>
    );
};

export default DataTable;

