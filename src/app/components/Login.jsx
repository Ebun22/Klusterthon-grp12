'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext, } from '../Context/Context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    // useEffect(() => {
    //     errRef.current.focus();
    // }, [])

    const { userDetails } = useStateContext();
    const { firstName, lastName, email, password, confirmPwd } = userDetails;

    return (
        <>
            <div className='flex flex-col items-center mt-18'>
                <form className='p-4 w-1/4' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className='py-8 text-4xl font-bold'>Login</h1>
                    <p className={`bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>error</p>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">UserName:</label>
                        <div class="input-group">
                            <i class="fas fa-user"></i>
                            <input type="text" ref={userRef} value={email} name="name" placeholder="Username" className='p-1 border-2 border-black rounded-sm' required />
                        </div>
                    </div>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Password:</label>
                        <div class="input-group">
                            <i class="fas fa-lock"></i>
                            <input ref={passwordRef} type='password'value={password} className='p-1 border-2 border-black rounded-sm' name="psw" placeholder="Password" required />
                        </div>
                    </div>
                    <p class="pwd"><a href="#">forgot password?</a></p>
                    <button type='button' onClick={(e) => handleSubmit(e)} className='w-full p-3 text-white font-bold mx-auto  bg-sky-600 rounded-lg'>LOG IN</button><br /><br />
                </form>
            </div>
        </>
    )
}

export default Login