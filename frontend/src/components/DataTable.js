// src/DataTable.js
import React from 'react';
import '../css/DataTable.css';
import { useAppContext } from '../App';

const getMappedColumnHeader = (column) => {
    switch (column) {
        case 'Email':
            return 'Email';
        case 'Name':
            return 'Name';
        case 'CreditScore':
            return 'Credit Score';
        case 'CreditLines':
            return 'Credit Lines';
        case 'MaskedPhoneNumber':
            return 'Masked Phone Number';
        default:
            return column;
    }
}

const DataTable = ({ data }) => {
    const {
        calculateSubscriptionPrice
    } = useAppContext();
    if (data.length === 0) {
        return <div className='text-center'>No data available. Please upload CSV.</div>;
    }

    return (
        <div className="table-container">
            <table className="data-table rounded">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Credit Score</th>
                        <th>Credit Lines</th>
                        <th>Masked Phone Number</th>
                        <th>Subscription Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{row.Email}</td>
                            <td>{row.Name}</td>
                            <td>{row.CreditScore}</td>
                            <td>{row.CreditLines}</td>
                            <td>{row.MaskedPhoneNumber}</td>
                            <td>
                                {calculateSubscriptionPrice(parseInt(row.CreditLines), parseInt(row.CreditScore))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
