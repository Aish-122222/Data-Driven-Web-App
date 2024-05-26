// src/DataDisplay.js
import React from 'react';
import DataTable from './DataTable';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import { useAppContext } from '../App';

const DataDisplay = () => {
    const {
        setPage,
        page,
        data,
        totalRows,
        setLimit,
        limit,
        fetchData,
        loading,
    } = useAppContext();
    const handlePageChange = (currentPage) => {
        setPage(currentPage);
        fetchData(limit, currentPage);
    };

    const handleLimitChange = (e) => {
        const updatedLimit = parseInt(e.target.value)
        setLimit(updatedLimit);
        setPage(1);
        fetchData(updatedLimit, 1);
    };

    return (
        loading ?
            <div className='min-h-[400px] flex items-center justify-center'>
                <Spinner />
            </div> :
            <div>
                <div className='bg-gray-300 text-black ml-auto my-3 w-fit px-2 py-1 rounded font-bold'>
                    <label htmlFor="limit">Items per page: </label>
                    <select id="limit" value={limit} className='bg-inherit active:border-none focus-visible:outline-none focus:border-none' onChange={handleLimitChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <DataTable data={data} />
                {data.length ? <div className='flex justify-center mt-4'>
                    <Pagination
                        current={page}
                        total={totalRows}
                        pageSize={limit}
                        onChange={handlePageChange}
                    />
                </div>: null}
            </div>
    );
};

const Spinner = ({ className = "h-5 w-5 text-white", ...props }) => {
  return (<svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" {...props} fill="white" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="black" strokeWidth="4"></circle>
    <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
  </svg>)
};

export default DataDisplay;
