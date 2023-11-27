'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import { Carousel, Login, SignUp, UserAuth } from '.';

const AuthPage = () => {
    // const { hasAccount } = useStateContext()
    return (
        <div className='flex flex-row overflow-x-hidden w-screen'>
            <div className='w-1/2'>
                <Carousel />
            </div>
            <div className='w-1/2'>
                <UserAuth />
            </div>
        </div>
    )
}

export default AuthPage;