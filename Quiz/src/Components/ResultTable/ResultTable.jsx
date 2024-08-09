import React, { useEffect, useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import ResultView from "./ResultView";
import {useNavigate} from "react-router-dom"
import Filter from './Filter';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

const ResultTable = ({ userData }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [dateSortOrder, setDateSortOrder] = useState("asc");
    const [specificDate, setSpecificDate] = useState("");
    const [filteredData, setFilteredData] = useState(userData);
    console.log(userData)
    const navigate  = useNavigate();

    useEffect(() => {
        let filtered = userData;

        if (searchQuery) {
            // console.log("here search query",searchQuery)
            filtered = filtered.filter(data =>
                data.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(data => data.status.status === statusFilter);
        }

        if (specificDate) {
            filtered = filtered.filter(data => new Date(data.createdAt).toDateString() === new Date(specificDate).toDateString());
        }

        // Sorting based on paper title
        if (sortOrder === "asc") {
            filtered.sort((a, b) => sortByTitle(a, b));
        } else {
            filtered.sort((a, b) => sortByTitle(b, a));
        }

        if (dateSortOrder === "asc") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredData(filtered);
    }, [searchQuery, statusFilter, sortOrder, dateSortOrder, specificDate, userData]);

    const sortByTitle = (a, b) => {
        const titleA = a.name.toLowerCase();
        const titleB = b.name.toLowerCase();
        return titleA.localeCompare(titleB);
    };

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    const handleApprove = () => {
        setStatusFilter('approved');
    };

    const handleInprogress = () => {
        setStatusFilter('inprogress');
    };

    const handleReject = () => {
        setStatusFilter('rejected');
    };

    const handlePending = () => {
        setStatusFilter('pending');
    };

    const handleReturned = () => {
        setStatusFilter('returned');
    };

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleDateSortOrderChange = () => {
        setDateSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleSpecificDateChange = (event) => {
        setSpecificDate(event.target.value);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setSpecificDate("");
    };

    const filterData = [
        {
            id: "title",
            title: "Ascending",
            icon: <AiOutlineSortAscending />,
            callBack: handleSortOrderChange
        },
        {
            id: "title",
            title: "Descending",
            icon: <AiOutlineSortDescending />,
            callBack: handleSortOrderChange
        },
        {
            id: "date",
            title: "Ascending",
            icon: <AiOutlineSortAscending />,
            callBack: handleDateSortOrderChange
        },
        {
            id: "date",
            title: "Descending",
            icon: <AiOutlineSortDescending />,
            callBack: handleDateSortOrderChange
        },
        {
            id: "date",
            title: null,
            icon: <input
                type="text"
                placeholder="Enter Student ID"
                className="inputSpecial"
                value={specificDate}
                onChange={handleSpecificDateChange}
            />,
            callBack: handleDateSortOrderChange
        },
        {
            id: "status",
            title: "Ascending",
            icon: <AiOutlineSortAscending />,
            callBack: handleDateSortOrderChange
        },
        {
            id: "status",
            title: "Descending",
            icon: <AiOutlineSortDescending />,
            callBack: handleDateSortOrderChange
        },
    ];


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
                    <MdOutlineFilterAltOff className="iconBigger" onClick={clearFilters} />
                </div>
            </div>
            <div className="data-table-inner">
                <div className="header-title-row">
                    <div className="colHeader DataNumber">Number</div>
                    <div className="colHeader">
                       Student Name <Filter id={"title"} filterData={filterData} />
                    </div>
                    <div className="colHeader">Student ID <Filter id={"date"} filterData={filterData} /> </div>
                    <div className="colHeader">Marks <Filter id={"status"} filterData={filterData} /> </div>
                    <div className="colHeader">Submission Time</div>
                    <div className="colHeader">Action</div>
                </div>

                {filteredData.map((data, index) => (
                    <div className="row-content" key={data._id}>
                            <ResultView data={data} index={index} />
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default ResultTable;