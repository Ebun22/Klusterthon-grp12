'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext, } from '../Context/Context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
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
        setUserDetails((prev) => ({...prev, [event.target.name]: event.target.value  }))
        console.log(userDetails)
    }

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin()
    }
    return (
        <>
            <form className='flex flex-col align-middle mt-28 w-full' onSubmit={(e) => handleSubmit(e)}>
                <h1 className='py-8 text-4xl font-bold text-farmer-green'>Login</h1>
                {/* <p className={`bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>error</p> */}
                <div className='mb-4 flex flex-col w-full'>
                    {/* <label className="font-bold">UserName:</label> */}
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input required type="email" name='email' placeholder="Email" value={email} className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                    </div>
                </div>
                <div className='mb-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Password:</label> */}
                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input ref={passwordRef} type='password' name='password' value={password} placeholder="Password" className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                    </div>
                </div>
                <p className="flex flex-col w-full items-end mb-2 text-sm"><a href="#" className="flex flex-col w-full items-end">forgot password?</a></p>
                <button type='button' onClick={(e) => handleSubmit(e)} className='w-full p-3 text-white font-bold mx-auto  bg-farmer-green rounded-lg'>LOG IN</button><br /><br />
                <p className="mt-4" onClick={() => setHasAccount(false)}>Don't have an account? <span className="mb-1.5 cursor-pointer hover:underline ">SignUp</span></p>
            </form>
        </>
    )
}

export default Login