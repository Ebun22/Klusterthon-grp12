'use client'
import Link from 'next/link';
import { useStateContext } from '@/app/Context/Context';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useState } from 'react';

const SignUp = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const pwdConfirmRef = useRef();
    const errRef = useRef();

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

    const { userDetails } = useStateContext();
    const { firstName, lastName, email, password, confirmPwd } = userDetails;

    return (
        <>
            <div className='flex flex-col items-center mt-18'>

                <form className='w-1/4' onSubmit={handleSubmit}>

                    <h1 className='py-8 pt-2 px-4 text-4xl font-bold'>SignUp</h1>
                    <p ref={errRef} className={`bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>{error}</p>

                    <div className='mb-4 px-4 flex flex-col w-full'>
                        {/* <label className="font-bold">Name:</label> */}
                        <input ref={userRef} required type="text" placeholder="Firstname" className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        {/* <label className="font-bold">Email:</label> */}
                        <input ref={emailRef} required type="text" placeholder="Lastname" className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        {/* <label className="font-bold">Email:</label> */}
                        <input ref={emailRef} required type="email" placeholder="Email" className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        {/* <label className="font-bold">Password:</label> */}
                        <input ref={passwordRef} type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        {/* <label className="font-bold">Confirm Password:</label> */}
                        <input ref={pwdConfirmRef} type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>

                    <span class="self-start">Have an account already? <a>Login</a></span>
                        <button
                            className='w-full p-3 text-white font-bold mx-auto bg-sky-600 rounded-lg'
                        >
                            SignUp
                        </button>
                
                </form>
            </div>
        </>
    )
}

export default SignUp;