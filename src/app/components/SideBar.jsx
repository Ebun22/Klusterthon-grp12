'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext, } from '../Context/Context';
import { GoHome, GoGear } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavLink } from './UI';

const SideBar = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();

    // useEffect(() => {
    //     errRef.current.focus();
    // }, [])
    const { userDetails, setUserDetails, setHasAccount, handleLogin } = useStateContext();
    const { firstName, lastName, email, password, confirmPwd } = userDetails;
    const handleUserDetails = (event) => {
        console.log(event.currentTarget.name)
        setUserDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        console.log(userDetails)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin()
    }
    return (
        <div className="w-1/5 min-h-screen flex flex-col text-white bg-farmer-green">
            <div className='flex flex-row w-full py-6 px-4 bg-farmer-green'>
                <img
                    src="/dummy-profile.png"
                    className="rounded-full"
                    width={80}
                    height={80}
                    alt="profile pic"
                />
                <div className='flex flex-col w-full mt-4 pl-4 text-white'>
                    <p className='font-bold text-3xl'>Hi, {userDetails.firstName}</p>{/*insert dynamic farmer name here */}
                    {/* <p>Increase yeild by finding out the best planting and Harvet season for all your crops today!</p> */}
                </div>
            </div>

            <div className='mt-8 p-1.5'>
                <NavLink
                    link={["home", "reports", "analysis", "settings"]}
                    label={["Home", "Reports", "Analysis", "Settings"]}
                    icon={[<GoHome />, <CgNotes />, <SiGoogleanalytics />, <GoGear />]}
                />
            </div>
        </div>
    )
}

export default SideBar;