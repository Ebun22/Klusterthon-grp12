'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import { useMultiStepForm } from '../Context/MultiStepForm';

const ExtraDetails = () => {
    const { cropDetails, setShowResult, getPrediction, setCropDetails } = useStateContext();
    const { temperature, humidity, ph,  waterAvailability } = cropDetails;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cropDetails)
        getPrediction()
        // setShowResult(true)
    }
    const handleChange = (event) => {
        console.log(event.currentTarget.name)
        setCropDetails((prev) => ({...prev, [event.target.name]: event.target.value  }))
        console.log(cropDetails)
    } 
    return (
        <div className='flex flex-col items-center my-6 '>
            <p>Aren't sure of these specifics yet? Feel free to leave this blank and submit. We can still predict a fruitfull harvest seaon based on aproximated values.<span>😊</span></p>
            <form className='p-4 w-full' onSubmit={(e) => handleSubmit(e)}>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Atmospheric Temperature:</label>
                    <input type='number' value={temperature} name='temperature' className='p-1 border border-black rounded-sm' onChange={handleChange} />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Atmospheric Humidity:</label>
                    <input type='number' value={humidity} name="humidity" className='p-1 border border-black rounded-sm' onChange={handleChange} />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Soil Water Availability:</label>
                    <input type='number' value={waterAvailability} name="waterAvailability" className='p-1 border border-black rounded-sm' onChange={handleChange} />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Soil pH:</label>
                    <input type='number' value={ph} name="ph" className='p-1 border border-black rounded-sm' onChange={handleChange} />
                </div>
                <button type="button" className='w-full p-3 text-white font-bold mx-auto bg-black rounded-lg' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ExtraDetails;