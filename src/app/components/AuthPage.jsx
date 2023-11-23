'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import { Carousel, Login, SignUp, UserAuth } from '.';

const AuthPage = () => {
    // const { hasAccount } = useStateContext()
    return (
        <>
            <div>
                <Carousel />
            </div>
            <div>
                <UserAuth />
            </div>
        </>
    )
}

export default AuthPage;