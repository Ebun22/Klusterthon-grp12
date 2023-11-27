'use client'
import React from 'react';
import { PiGrains } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStateContext } from '../Context/Context';
import { DetailsBox } from '../components/UI';
import TableHead from '../components/UI/TableHead';
import TableBody from '../components/UI/TableBody';

// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Report = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart of Result'
            }
        },
        responsive: true,
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const faker = [800, 200, 400, 600, 100, 300,]
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: labels.map(() => faker),
                borderWidth: 1,
                height: '600px',
                width: '600px',
                borderColor: '#7d9820',
                backgroundColor: '#7d9820',
            },
        ],
    };

    const cropDetails = [{
        id: "#65715289354510",
        label: "cotton",
        country: "Nigeria",
        temperature: 25.5,
        humidity: 80.0,
        waterAvailability: 0.6,
        ph: 6.5,
        season: 'January-March'
    }]

    return (
        <div className='flex flex-col w-1/2 h-full mx-4 rounded-mid shadow-lg mt-6 bg-white sm:ml-4 w-full'>
            <div className="w-full h-full flex flex-row bg-lime-shade-200 rounded-large py-6 px-6 mx-auto mt-4 ml-18 pl-8 sm:w-4/5">
                <DetailsBox icon={<PiGrains />} number={40} title='Number of Crops' />
                <p className="border border-1-slate-600 ml-0 mr-2 sm:mx-6"></p>
                <DetailsBox icon={<MdLocationPin />} number={69} title='Number of Locations' />
                <p className="border border-1-slate-600 ml-0 mr-2 sm:mx-6"></p>
                <DetailsBox icon={<LuUsers2 />} number={20} title='Number of Users' />
            </div>
            <div className="hidden  w-1/2  flex flex-row  rounded-lg py-6 px-6 mx-auto mt-4 pl-8 lg:block w-3/4">
                <Bar
                    options={options}
                    data={data}
                />
            </div>
            <div className="flex flex-col w-full rounded-lg mt-6  lg:grid grid-cols-10 gap-4 lg:p-8">
                <div className="order-last sm:col-start-2 col-span-5 lg:row-start-1 ">
                    <TableHead
                        head={[
                            <p className='rounded-tl-lg overflow-hidden w-full font-bold bg-farmer-green pt-0 p-2 text-center text-xs lg:text-base w-1/2 lg:pt-2 lg:h-18'>Crop name</p>,
                            <p className=' py-2 h-10 text-center bg-farmer-green font-bold text-sm lg:text-base w-full lg:p-2 lg:pt-4 lg:h-22'>ID</p>,
                            <p className='h-10 text-center bg-farmer-green font-bold text-sm lg:text-base lg:p-2 pt-4 lg:h-22'>Location</p>,
                            <p className='rounded-tr-lg h-10 pt-0 text-center bg-farmer-green font-bold text-xs  lg:p-2 lg:pt-1 lg:h-22 lg:text-sm'>Harvest Season</p>]}
                    >
                        {cropDetails.map((store) => {
                            return (
                                <TableBody
                                    details={[
                                        <p>{store.label}</p>,
                                        <p className="flex flex-row justify-center">{store.id}</p>,
                                        <p>{store.country}</p>,
                                        <p className="flex flex-row justify-center">{store.season}</p>,
                                    ]}
                                />
                            )
                        }
                        )}
                    </TableHead>
                </div>
                <div className="w-full bg-white shadow-lg rounded-mid sm:col-start-7 col-span-4 p-6">
                    <div className='w-full text-center text-gray-600'> <p>Crop details</p></div>
                    <div className='flex flex-row w-full text-center text-gray-600'>
                        <div className='flex flex-col justify-start w-1/2'>
                            <p className='text-2xl font-bold w-1/3'>Rice</p>
                            <p className='text-sm text-gray-600 w-1/3'>Nigeria</p>
                        </div>
                        <div className='flex flex-col justify-end w-1/2'>
                            <p className='text-2xl font-bold w-full text-right'>Summer</p>
                            <p className='italic text-sm w-full ml-2'>Late June - Early March</p>
                        </div>
                    </div>
                    <div className='flex flex-row justif-end mt-8 text-gray-600'>
                        <div className='flex flex-col w-full justif-end'>
                            <p>Soil pH: 3</p>
                            <p>Water Avail. : 34.5</p>
                        </div>
                        <div  className='flex flex-col w-full justif-end'>
                            <p>Humidity: 67</p>
                            <p>Temperature: 35.5C</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;