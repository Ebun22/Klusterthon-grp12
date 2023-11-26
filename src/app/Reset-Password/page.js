'use client'
import React from 'react';
import { PiGrains } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { useStateContext } from '../Context/Context';

// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Home = () => {
    const { userDetails, setUserDetails, setHasAccount, handleLogin } = useStateContext();
    const { firstName, lastName, email, password, confirmPwd } = userDetails;

    const handleUserDetails = (event) => {
        console.log(event.currentTarget.name)
        setUserDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        console.log(userDetails)
    }

    return (
        <div className='flex flex-col items-center align-middle w-3/4 h-screen min-h-screen bg-white mt-36 mx-auto'>

            <p className="font-bold text-4xl text-farmer-green">Reset Password</p>
            <div className="flex flex-col items-center align-middle w-3/4 h-screen min-h-screen bg-white mt-2 mx-auto">
                <div className=' flex flex-col w-1/2 mt-2 mx-auto'>
                    <label className="font-bold text-xl">Password:</label>
                    <div className="input-group">
                        <input required type="email" name='email' placeholder="Email" value={password} className='p-2 border border-farmer-green rounded-md w-full' onChange={handleUserDetails} />
                    </div>
                </div>
                <div className='mb-2 flex flex-col w-1/2 mt-6 mx-auto'>
                    <label className="font-bold text-xl">Confirm Password:</label>
                    <div className="input-group">
                        <input required type="password" name='confirmPwd' placeholder="confirm Password" value={confirmPwd} className='p-2 border border-farmer-green rounded-md w-full' onChange={handleUserDetails} />
                    </div>
                </div>
                <button type='button' onClick="" className='text-center font-bold text-xl w-1/4 p-4 bg-farmer-green text-white rounded-md'>Submit</button>
            </div>
        </div>
    )
}

export default Home;