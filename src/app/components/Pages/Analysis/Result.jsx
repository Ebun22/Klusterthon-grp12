'use client'
import React from 'react';
import ExtraDetails from './ExtraDetails';
import { useStateContext } from '../../../Context/Context';
import { useMultiStepForm } from '../../../Context/MultiStepForm';
import Link from 'next/link';

const CropDetails = () => {
    const { cropDetails } = useStateContext();
    const { cropName, location } = cropDetails;

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
                <p>Planted today? You can harvest this Rice in starting November!</p>
                <Link href="/?=reports">
                    <button className="p-3 mt-6 text-white font-bold mx-auto bg-black rounded-lg">View Reports</button>
                </Link>
            </div>
        </div>
    )
}

export default CropDetails;