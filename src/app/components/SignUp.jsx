'use client'
import Link from 'next/link';
import { useStateContext } from '../Context/Context';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useState } from 'react';

const SignUp = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const pwdConfirmRef = useRef();
    const errRef = useRef();

    const { userDetails, setUserDetails, setHasAccount, postUserDetails } = useStateContext();
    const { firstName, lastName, email, password, confirmPwd } = userDetails;
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // const [loading, setLoading] = useState(false); 
    // const [error, setError] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     //after waiting for signup
    //     setLoading(true)
    // }

    // useEffect(() => {
    //     errRef.current.focus();
    // }, [error])
    const handleUserDetails = (event) => {
        console.log(event.currentTarget.name)
        setUserDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        console.log(userDetails)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postUserDetails();
    }

  
     
    return (
        <>
            <form className='flex flex-col align-middle mt-28 w-full' onSubmit={handleSubmit}>

                <h1 className='py-8 pt-2 px-4 text-4xl font-bold text-farmer-green'>SignUp</h1>
                {/* <p ref={errRef} className={`bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>{error}</p> */}

                <div className='mb-4 px-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Name:</label> */}
                    <input ref={userRef} required type="text" name='firstName' placeholder="Firstname" value={firstName} className='p-1 border border-farmer-green rounded-md' onChange={handleUserDetails} />
                </div>
                <div className='mb-4 px-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Email:</label> */}
                    <input ref={emailRef} required type="text" name='lastName' placeholder="Lastname" value={lastName} className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                </div>
                <div className='mb-4 px-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Email:</label> */}
                    <input ref={emailRef} required type="email" name='email' placeholder="Email" value={email} className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                </div>
                <div className='mb-4 px-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Password:</label> */}
                    <input ref={passwordRef} type='password' name='password' placeholder="Password" value={password} className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                </div>
                <div className='mb-4 px-4 flex flex-col w-full'>
                    {/* <label className="font-bold">Confirm Password:</label> */}
                    <input ref={pwdConfirmRef} type='password' name='confirmPwd' placeholder="Confirm Password" value={confirmPwd} className='p-1 border-2 border-farmer-green rounded-md' onChange={handleUserDetails} />
                </div>

                <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className='w-full p-3 text-white font-bold mx-auto bg-farmer-green rounded-lg'
                >
                    SignUp
                </button>
                <p class="self-start mt-4 ml-4" onClick={() => setHasAccount(true)}>Have an account already? <span className="mb-1.5 cursor-pointer hover:underline ">Login</span></p>
            </form>
        </>
    )
}

export default SignUp;