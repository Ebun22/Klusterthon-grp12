'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import { Login, SignUp, UserAuth } from '.';

const AuthPage = () => {
    // const { hasAccount } = useStateContext()
    return (
        <>
            <div>
                {/* The carousel */}
            </div>
            <div>
                <UserAuth />
            </div>
        </>
    )
}

export default AuthPage;