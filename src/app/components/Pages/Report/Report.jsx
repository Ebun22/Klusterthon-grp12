'use client'
import React from 'react';
import { TbToolsKitchen, TbUserPentagon } from 'react-icons/tb';
import { Bar } from 'react-chartjs-2';
import { useStateContext } from '../../../Context/Context';
import { DetailsBox } from '../../UI';

// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Report = () => {
   

    <Bar
      options={...}
      data={...}
      {...props}
    />

    return (
        <div className='flex flex-col w-full h-full bg-white'>
            <div className="flex flex-row w-3/4 bg-lime-50 rounded-lg py-6 px-6 mx-auto mt-4 pl-8">
                <DetailsBox icon={<TbToolsKitchen />} number={40} title='Number of Crops' />
                <p className="border border-1-slate-600 mx-6"></p>
                <DetailsBox icon={<TbToolsKitchen />} number={69} title='Number of Locations' />
                <p className="border border-1-slate-600 mx-6"></p>
                <DetailsBox icon={<TbToolsKitchen />} number={20} title='Number of Users' />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Report;