'use client'
import React from 'react';
import { useStateContext } from '@/app/Context/Context';

const CropDetails = () => {
    const { mainCropDetails } = useStateContext();
    const { cropName, location } = mainCropDetails;

    return (
        <div className='flex flex-col items-center'>
            <form className='p-4 w-full' onSubmit="{(e) => handleSubmit(e)}">
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Location(country):</label>
                    <input type='location' value={location} className='p-1 border border-black rounded-sm' />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Crop:</label>
                    <input type='crop' value={cropName} className='p-1 border border-black rounded-sm' />
                </div>
            </form>
        </div>
    )
}

export default CropDetails;