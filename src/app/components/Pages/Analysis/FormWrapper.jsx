"use client";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useRef, useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify'
import { useStateContext, } from '../../../Context/Context';
import { useMultiStepForm } from '../../../Context/MultiStepForm';
// import { CropDetails } from '../..';
import ExtraDetails from './ExtraDetails';
import CropDetails from './CropDetails';




const FormWrapper = () => {

    const { userDetails } = useStateContext();
    const { step, isFirstStep, currentStepIndex, isLastStep, fakeLast, endStep, next, back, goTo } = useMultiStepForm([
        <CropDetails />,
        <ExtraDetails />,
    ])

    return (
        <>
            <div className='flex flex-col items-center my-auto w-full mt-22'>
                {!isFirstStep && <button type="button" className='flex font-bold text-black relative left-0 w-1/2 float-left place-items-start' onClick={back}><span className='mr-1 text-2xl'><IoArrowBackCircle /></span>Back</button>}
                <div className='flex flex-row items-center w-2/5'>
                    {step}
                </div>
                <div className='flex flex-col place-items-end w-2/5 float-right '>
                   {isFirstStep && <button type="submit" className='flex place-items-end float-right ml-22 p-3 text-white font-bold bg-black rounded-lg' onClick={next}>Next <span className="ml-3 mb-1"><GrLinkNext /></span></button>}
                </div>
            </div>
        </>
    )
}



export default FormWrapper;