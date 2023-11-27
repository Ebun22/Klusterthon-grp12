'use client'
import React, { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { IoLogOutOutline } from "react-icons/io5";
import { useStateContext } from '../Context/Context';
import { useRouter } from 'next/navigation';


const Header = () => {
    const { setIsUser, userDetails, setIsVisible } = useStateContext();

    const router = useRouter()

    const handleLogOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
router.push('/')
        setIsUser(false);
    };

    const handleHamburger = () => { setIsVisible(true), console.log("i ckicked on burger") }
  
    return (
        <div className="flex flex-row w-full ml-3 rounded-l-large shadow-lg bg-white ">
            <div
                className="hamburg block cursor-pointer h-4 my-auto ml-2 lg:hidden"
                onClick={handleHamburger}
            >
                <div className="first w-6 h-1 mb-1 bg-black  rounded-mid"></div>
                <div className="second w-8 h-1 mb-1 bg-black  rounded-mid"></div>
                <div className="third w-10 h-1 bg-black  rounded-mid"></div>
            </div>
            <p className='font-bold text-3xl p-3 pl-6 sm:h-1/2 my-auto '>Dashboard</p>
            <div className="hidden sm:flex flex-row justify-end w-full mr-6 py-4 pr-4 ">
                <div className="flex flex-col mr-2">
                    <p className="font-bold">{userDetails.firstName + " " + userDetails.lastName}</p>
                    <p onClick={handleLogOut} className='flex flex-row cursor-pointer justify-end text-sm text-red-600'>Logout<span className='text-red-600 mt-1'><IoLogOutOutline /></span></p>
                </div>

                <img
                    src="/dummy-profile.png"
                    className="rounded-full "
                    width={50}
                    height={50}
                    alt="profile pic"
                />
            </div>
        </div>
    )
}

export default Header;