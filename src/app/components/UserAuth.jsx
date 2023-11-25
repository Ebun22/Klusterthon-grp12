'use client'
import React, { useRef } from 'react';
import { Login, SignUp } from '.';
import { useStateContext, } from '../Context/Context';

const UserAuth = () => {
    const { hasAccount } = useStateContext();
    // const authCont = useRef(null)

    // const goToSignUp = () => { authCont.current.scrollLeft += 250, console.log("This is the login ", authCont.current) };
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">

            {hasAccount ?
                <div className='flex flex-col items-center align-middle mt-18 h-full'>
                    <Login />
                </div>
                :
                <div className='flex flex-col align-middle mt-18 h-full'>
                    <SignUp />
                </div>
            }
            {/* <div className=' flex flex-row items-center w-full h-full overflow-x-scroll scroll-smooth snap-mandatory snap-x '>
                <div ref={authCont} className=' flex flex-row items-center w-full h-full overflow-x-scroll scroll-smooth snap-mandatory snap-x ' >
                    <div className='snap-start h-screen min-w-full '>
                        <Login />
                        <p className=''>
                            Don't have an account? <p onClick={goToSignUp}>Signup</p>
                        </p>
                    </div>
                    <div className='snap-start h-screen min-w-full'>
                        <SignUp />
                        <p>
                            Already have an account? <p onClick=''>Signup</p>
                        </p>
                    </div>
                </div>
                <div ref={authCont} className='snap-start h-screen min-w-full flex flex-col items-center align-middle mt-18 min-h-screen h-full'>

                </div>
            </div> */}
        </div>
    )
}

export default UserAuth;