'use client'
import React from 'react';
import { Spinner } from "@material-tailwind/react";
import { useStateContext } from '../Context/Context';

const Loading = () => {
    const { userDetails, setUserDetails} = useStateContext();
    const { email} = userDetails;
    
    const handleUserDetails = (event) => {
        console.log(event.currentTarget.name)
        setUserDetails((prev) => ({...prev, [event.target.name]: event.target.value  }))
        console.log(userDetails)
    }

    return (
            <div className="flex items-center w-full, h-full">
              <Spinner color="farner-green" className="h-12 w-12" />
            </div>
    )
}

export default Loading;