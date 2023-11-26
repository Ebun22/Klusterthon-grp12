'use client'
import React from 'react';
import { useStateContext } from '../Context/Context';
import FormWrapper from './FormWrapper';
import { Result } from '../components';
// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Analysis = () => {
    const { showResult } = useStateContext();
 
    return (
        <div className='flex flex-col mt-2 w-full h-full rounded-l-lg shadow-md bg-white'>
           {!showResult ? <FormWrapper /> : <Result />}
        </div>
    )
}

export default Analysis;