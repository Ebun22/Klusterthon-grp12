"use client"
import React, {ReactEventHandler, useState} from 'react';

const Button = ({ type, text, onClick, style}) => {
    return (
        <>
            <div className="flex justify-center w-full my-6">
                <button type={type} onClick={onClick} className={`${style} bg-blue-950 rounded-lg text-white w-1/2 py-2`}>{text}</button>
            </div>
        </>
    )
}

export default Button;