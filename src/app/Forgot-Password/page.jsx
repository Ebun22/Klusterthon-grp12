'use client'
import React from 'react';
import { PiGrains } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { useStateContext } from '../Context/Context';

// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Home = () => {
    const { userDetails, setUserDetails} = useStateContext();
    const { email} = userDetails;
    
    const handleUserDetails = (event) => {
        console.log(event.currentTarget.name)
        setUserDetails((prev) => ({...prev, [event.target.name]: event.target.value  }))
        console.log(userDetails)
    }

    return (
        <div className='flex flex-col items-center align-middle w-3/4 h-screen min-h-screen bg-white mt-36 mx-auto'>
            <div classname="">
                <p className="font-bold text-4xl text-farmer-green">Forgot Password?</p>
                <p >No worries. Enter your Email address and we would share a reset link to you.</p>
            </div>
            <div className='mb-4 flex flex-col w-1/2 mt-14 mx-auto'>
                <label className="font-bold text-xl">Email:</label>
                <div className="input-group">
                    <input required type="email" name='email' placeholder="Email" value={email} className='p-2 border border-farmer-green rounded-md w-full' onChange={handleUserDetails} />
                </div>
            </div>
            <button type='button' onClick="" className='text-center font-bold text-xl w-1/4 p-4 bg-farmer-green text-white rounded-md'>Get the reset Link</button>
        </div>
    )
}

export default Home;