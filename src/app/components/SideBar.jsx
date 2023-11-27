'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext, } from '../Context/Context';
import { GoHome, GoGear } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavLink } from './UI';

const SideBar = () => {
    const userRef = useRef();
 
    const { userDetails, setUserDetails, setHasAccount, handleLogin,  isVisible, setIsVisible } = useStateContext();
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

    const close = () => {setIsVisible(false)}

    const driverObj = driver({
      animate: false,
      showProgress: false,
      showButtons: ['next', 'previous', 'close'],
      steps: [
          { element: '#sideBar', popover: { title: 'SideBar', description: 'This is the sideBar that directs you to every page a smart farmer would need. Head over to Analysis to enter in your details and start FARMING SMART!', side: "right", align: 'start' } },
          { popover: { title: 'Have fun Smart Farmer!', description: 'View all your analisys at reports' } }
      ]
  });

  useEffect(() => {
      driverObj.drive();
  }, [])

console.log(isVisible)
    return (
        <div id='sideBar' className={`${isVisible ? "absolute z-10 left-0 min-h-screen text-white bg-black px-6 lg:block flex flex-col w-1/5 relative" : "hidden min-h-screen flex flex-col text-white bg-black px-6 lg:block flex flex-col w-1/5 relative" }`}>
        <div className={`flex flex-row w-full`}>
          <img
            src="/logo.png"
            className="mx-4 pl-3 ml-0 mt-2"
            width={170}
            height={150}
            alt="profile pic"
          />
          <div className='hidden lg:flex text-3xl h-10 my-auto font-light w-full justify-end items-end'>
            <p className='hidden lg:text-3xl font-light w-3.5 ' onClick={close}>X</p>
          </div>
        </div>
      
        <div className={`transform ${isVisible ? 'translate-x-0 w-full block' : 'sm:block flex flex-col mt-8 p-1.5 w-full'}`}>
          <NavLink
            label={["Home", "Reports", "Analysis", "Settings"]}
            icon={[<GoHome />, <CgNotes />, <SiGoogleanalytics />, <GoGear />]}
          />
        </div>
      </div>
      
    )
}

export default SideBar;