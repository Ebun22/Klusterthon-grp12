"use client";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FormEvent, ReactDOM, ReactEventHandler, ReactNode, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import { useStateContext, } from '../Context/Context';
import { useMultiStepForm } from '../Context/MultiStepForm';
import { CropDetails } from '.';
import ExtraDetails from './ExtraDetails';




const FormWrapper = () => {
    
    const { userDetails } = useStateContext();
    const { step, isFirstStep, currentStepIndex, isLastStep, fakeLast, endStep, next, back, goTo } = useMultiStepForm([
        <CropDetails />,
        <ExtraDetails />,
    ])

console.log(UserDetails)
    return (
        <>
            <div className='flex flex-col items-center my-auto w-full h-full my-10'>
                <div>
                    {!isFirstStep && (<button type="button" className='font-bold text-black' onClick={back}>Back</button>)}
                    {step}
                    <button type="submit" className='w-full p-3 text-white font-bold mx-auto bg-green-600 rounded-lg' onClick={next}>{endStep ? "Submit" : "Next"}</button>
                </div>
            </div>
        </>
    )
}



export default FormWrapper;