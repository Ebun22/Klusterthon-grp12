'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
<<<<<<< HEAD
import { Login, SignUp, UserAuth } from '.';
=======
import { Carousel, Login, SignUp, UserAuth } from '.';
>>>>>>> 95b0912733be055f1d3c6caf25060867e19eb723

const AuthPage = () => {
    // const { hasAccount } = useStateContext()
    return (
        <>
            <div>
<<<<<<< HEAD
                {/* The carousel */}
=======
                <Carousel />
>>>>>>> 95b0912733be055f1d3c6caf25060867e19eb723
            </div>
            <div>
                <UserAuth />
            </div>
        </>
    )
}

export default AuthPage;