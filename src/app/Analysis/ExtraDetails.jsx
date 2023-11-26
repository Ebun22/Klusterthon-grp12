'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import { useMultiStepForm } from '../Context/MultiStepForm';

const ExtraDetails = () => {
    const { cropDetails, setShowResult } = useStateContext();
    const { temperature, humidity, pH, waterAvalability } = cropDetails;

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResult(true)
    }
    return (
        <div className='flex flex-col items-center my-6 '>
            <p>Aren't sure of these specifics yet? Feel free to leave this blank and submit. We can still predict a fruitfull harvest seaon based on aproximated values.<span>😊</span></p>
            <form className='p-4 w-full' onSubmit={(e) => handleSubmit(e)}>
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
                <button type="submit" className='w-full p-3 text-white font-bold mx-auto bg-black rounded-lg' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ExtraDetails;