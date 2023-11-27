'use client'
import React from 'react';
import { Spinner } from "@material-tailwind/react";


const Loading = () => {
  
    return (
            <div className="flex flex-col items-center  w-full min-h-screen h-full">
              <Spinner color="green" className="h-42 w-42 green  align-middle my-auto" />
            </div>
    )
}

export default Loading;