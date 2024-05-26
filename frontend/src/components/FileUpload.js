// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/common';
import { useAppContext } from '../App';

const FileUpload = () => {
    const {
        fetchData,
        setLimit,
        setPage
    } = useAppContext();
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const onFileUpload = (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file);

        setShowProgress(true);

        axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
            }
        }).then(async () => {
            setShowProgress(false);
            setUploadPercentage(0); // Reset the progress bar after upload

            setLimit(10);
            setPage(1);

            fetchData(10, 1);
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    };

    return (
        <div>
            <div>
                <div className=' flex justify-center items-center p-4 bg-gray-800 rounded text-white h-20'>
                    <div className='tw-min-w-[400px]'>
                        {!showProgress && <div className='flex justify-center items-center'>
                            <div className='relative'>
                                <input id="file-upload" type="file" className='hidden' onChange={onFileUpload} accept='.csv' />
                                <label for="file-upload" className="bg-blue-500 p-2 rounded cursor-pointer">
                                    Upload CSV
                                </label>
                            </div>
                        </div>}
                        {showProgress && <>
                            <span className='text-sm font-light'>upload under progress...</span>
                            <div value={uploadPercentage} className='relative h-5 rounded overflow-hidden'>
                                <div className='absolute left-0 right-0 text-center font-semibold '>{uploadPercentage}%</div>
                                <div style={{
                                    width: `${uploadPercentage}%`
                                }} className='bg-green-500 h-full'></div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default FileUpload;
