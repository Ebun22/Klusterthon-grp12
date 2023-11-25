"use client"
import React from 'react';


const NumBox = ({icon, number, title}) => {

    return (
        <div className="flex flex-row justify-center  pr-4 ">
            <div className="flex flex-row bg-white h-12 rounded-full py-4 px-4 mr-4 ">
              {icon}
            </div>
            <div>
                <p className="font-bold text-xl text-center">
                   {number}
                </p>
                <p className="text-slate-600 text-sm">{title}</p>
            </div>
        </div>

    )
}

export default NumBox;