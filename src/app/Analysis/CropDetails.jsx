'use client'
import React from 'react';
import ExtraDetails from './ExtraDetails';
import { useMultiStepForm } from '../Context/MultiStepForm';
import { useStateContext } from '../Context/Context';

const CropDetails = () => {
    const { cropDetails, setCropDetails, getPrediction } = useStateContext();
    const { label, country } = cropDetails;

    const handleChange= (event) => {
        console.log(event.currentTarget.name)
        setCropDetails((prev) => ({...prev, [event.target.name]: event.target.value  }))
        console.log(cropDetails)
    }

    return (
        <div className='flex flex-col items-center my-auto align-middle'>
            <p>These are compulsory fields to predict the best harvest seasons. These sadly can't be skipped<span>😋</span></p>
            <form className='p-4 w-full' onSubmit="{(e) => handleSubmit(e)}">
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Location(country):</label>
                    <input type='location' value={country} name='country' className='p-1 border border-black rounded-sm' onChange={handleChange} required />
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    <label className="font-bold">Crop:</label>
                    <input type='crop' value={label} name='label' className='p-1 border border-black rounded-sm' onChange={handleChange} required />
                </div>
            </form>
          
        </div>
    )
}

export default CropDetails;