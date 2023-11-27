'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import FormWrapper from './FormWrapper';
import { Result } from '../components';
// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Analysis = () => {
    const { showResult } = useStateContext();
 
    return (
        <div className='flex flex-col mt-2 w-full h-full mb-6 pb-4 rounded-l-lg shadow-md bg-white'>
           {!showResult ?
           (
            <div className='flex flex-col items-center w-full h-full mt-4'>
                <p className='flex flex-col items-center text-5xl text-center my-4 text-farmer-green font-extrabold'>Predict the best harvest season for any crop </p>
                <FormWrapper />
            </div>
           )  : <Result />}
        </div>
    )
}

export default Analysis;