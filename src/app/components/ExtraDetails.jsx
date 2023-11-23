'use client'
import React from 'react';
import { useStateContext } from '@/app/Context/Context';

const ExtraDetails = () => {
    const { extraCropDetails } = useStateContext();
    const {  temperature, humidity, pH, waterAvalability } = extraCropDetails;

    return (
        <div className='flex flex-col items-center my-6'>
            <form className='p-4 w-full' onSubmit="{(e) => handleSubmit(e)}">
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Atmospheric Temperature:</label>
                    <input type='location' value={temperature} className='p-1 border border-black rounded-sm' />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Atmospheric Humidity:</label>
                    <input type='location' value={humidity} className='p-1 border border-black rounded-sm' />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Soil Water Availability:</label>
                    <input type='crop' value={waterAvalability} className='p-1 border border-black rounded-sm' />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Soil pH:</label>
                    <input type='location' value={pH} className='p-1 border border-black rounded-sm' />
                </div>
            </form>
        </div>
    )
}

export default ExtraDetails;