'use client'
import React from 'react';
import { Image } from 'next/image';
import { useStateContext } from '../Context/Context';

const Header = () => {
    const { extraCropDetails } = useStateContext();
    const { temperature, humidity, pH, waterAvalability } = extraCropDetails;

    return (
        <div className='flex flex-row w-full h-full py-6 px-8 bg-green-600'>
            <img
                src="/dummy-profile.png"
                className="rounded-full"
                width={150}
                height={150}
                alt="profile pic"
            />
            <div className='flex flex-col w-full h-full mt-8 pl-4 text-white'>
                <p className='font-bold text-3xl pb-3'>Hi, Ebunoluwa</p>{/*insert dynamic farmer name here */}
                <p>Increase yeild by finding out the best planting and Harvet season for all your crops today!</p>
            </div>

        </div>
    )
}

export default Header;