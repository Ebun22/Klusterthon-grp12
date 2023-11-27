'use client'
import React from 'react';
import { Spinner } from "@material-tailwind/react";


const Loading = () => {
  
    return (
            <div className="flex items-center w-full, h-full">
              <Spinner color="farmer-green" className="h-12 w-12" />
            </div>
    )
}

export default Loading;