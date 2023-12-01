'use client'
import React from 'react';
import ExtraDetails from './ExtraDetails';
import { useStateContext } from '../Context/Context';
import { useMultiStepForm } from '../Context/MultiStepForm';
import Link from 'next/link';

const CropDetails = () => {
    const { cropDetails, prediction } = useStateContext();
    const { label } = cropDetails;

    const getMonths = (prediction) => {
        const seasonsData = {
          winter: "early December - mid February",
          spring: "mid March - late May",
          summer: "early June - mid August",
          autumn: "mid September - late November",
          rainy: "April - October (varies by region)",
          dry: "November - March (varies by region)",
        };
    
        if(seasonsData.hasOwnProperty(seasons)){
          return seasonsData[seasons];
        }
      }

    return (
        <div className='flex flex-col items-center my-auto align-middle'>
            <img
                src="/img5.jpg"
                className="rounded-full"
                width={250}
                height={250}
                alt="profile pic"
            />
            <div className='flex flex-col items-center align-middle'>
                <p className="font-bold text-2xl">Congratulations🥳</p>
                <p>Planted today? You can start harvest this {label} during {prediction}!</p>
                <Link href="/Reports">
                    <button className="p-3 mt-6 text-white font-bold mx-auto bg-black rounded-lg">View Reports</button>
                </Link>
            </div>
        </div>
    )
}

export default CropDetails;