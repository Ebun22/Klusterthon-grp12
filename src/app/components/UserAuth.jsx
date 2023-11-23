'use client'
import React from 'react';
import { Login, SignUp } from '.';

const UserAuth = () => {
    let hasAccount = true;
    return (
        <div>
            {
                hasAccount ? <Login /> : <SignUp />
            }
        </div>
    )
}

export default UserAuth;