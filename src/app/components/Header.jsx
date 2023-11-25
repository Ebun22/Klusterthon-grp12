'use client'
import React, {useState, useEffect} from 'react';
import { Image } from 'next/image';
import { IoLogOutOutline } from "react-icons/io5";
import { useStateContext } from '../Context/Context';

const Header = () => {

    const handleLogOut = () => {localStorage.removeItem("isLoggedIn")};

    return (
        <div className="flex flex-row w-full ml-3 mt-1 rounded-l-full shadow-sm bg-white ">
            <p className='font-bold text-3xl p-4 pl-6'>Dashboard</p>
            <div className="flex flex-row justify-end w-full mr-6 py-4">
                <div className="flex flex-col mr-2">
                    <p>UserName</p>
                    <p onClick={handleLogOut} className='flex flex-row cursor-pointer justify-end text-sm text-red-600'>Logout<span className='text-red-600 mt-1'><IoLogOutOutline /></span></p>
                </div>

                <img
                    src="/dummy-profile.png"
                    className="rounded-full h-10"
                    width={40}
                    height={40}
                    alt="profile pic"
                />
            </div>
        </div>
    )
}

export default Header;