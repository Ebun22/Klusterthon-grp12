'use client'
import React from 'react';
import { Image } from 'next/image';
import { useStateContext } from '../Context/Context';

const Header = () => {

    return (
        <div className="w-full ml-3 mt-1 rounded-l-full shadow-sm bg-white ">
            <p className='font-bold text-3xl p-4 pl-6'>Dashboard</p>
        </div>
    )
}

export default Header;