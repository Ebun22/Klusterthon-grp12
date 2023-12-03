'use client'
import React, { useState, useEffect } from 'react';
import { PiGrains } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
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

    const { cropDetails, prediction, farmerData } = useStateContext();

    const getmonths = (seasons) => {
        const seasonsData = {
            winter: "early December - mid February",
            spring: "mid March - late May",
            summer: "early June - mid August",
            autumn: "mid September - late November",
            rainy: "April - October (varies by region)",
            dry: "November - March (varies by region)",
        };

        if (seasons in seasonsData) {
            return seasonsData[seasons];
        }
    }


    const driverObj = driver({
        animate: false,
        showProgress: false,
        showButtons: ['next', 'previous', 'close'],
        steps: [
            { element: '#stats', popover: { title: 'Status Board', description: 'Here is the status board that gives an overview  of the number of crops, you have made predictions on, Number of locations, and the number of other smart farmers like you!', side: "left", align: 'start' } },
            { element: '#chart', popover: { title: 'Chart', description: 'Here is the graph of number of crops that can be harvested against the months. to let you know the months with the most harvest', side: "bottom", align: 'start' } },
            { element: '#table', popover: { title: 'Harvest Details', description: 'This is a clear representation of all your predictions!', side: "bottom", align: 'start' } },
            { popover: { title: 'Have fun Smart Farmer!', description: 'And that is all, go ahead and start adding making predictions' } }
        ]
    });

    useEffect(() => {
        driverObj.drive();
    }, [])

    return (
        <div className='flex flex-col w-1/2 h-full mx-4 rounded-mid shadow-lg mt-6 bg-white sm:ml-4 w-full'>
            <div id='stats' className="w-full h-full flex flex-row bg-lime-shade-200 rounded-large py-6 px-6 mx-auto mt-4 ml-18 pl-8 sm:w-4/5">
                <DetailsBox icon={<PiGrains />} number={40} title='Number of Crops' i />
                <p className="border border-1-slate-600 ml-0 mr-2 sm:mx-6"></p>
                <DetailsBox icon={<MdLocationPin />} number={69} title='Number of Locations' />
                <p className="border border-1-slate-600 ml-0 mr-2 sm:mx-6"></p>
                <DetailsBox icon={<LuUsers2 />} number={20} title='Number of Users' />
            </div>
            <div id='chart' className="hidden  w-1/2  flex flex-row  rounded-lg py-6 px-6 mx-auto mt-4 pl-8 lg:block w-3/4">
                <Bar
                    options={options}
                    data={data}
                />
            </div>
            <div id='table'  className="flex flex-col w-full rounded-lg mt-6  lg:grid grid-cols-10 gap-4 lg:p-8">
                <div className="order-last sm:col-start-2 col-span-7 lg:row-start-1 ">
                    <TableHead
                        head={[
                            <p className='rounded-tl-lg overflow-hidden w-full font-bold bg-farmer-green pt-0 p-2 text-center text-xs lg:text-base w-1/2 lg:pt-2 lg:h-18'>Crop name</p>,
                            <p className=' py-2 h-10 text-center bg-farmer-green font-bold text-sm lg:text-base w-full lg:p-2 lg:pt-4 lg:h-22'>ID</p>,
                            <p className='h-10 text-center bg-farmer-green font-bold text-sm lg:text-base lg:p-2 pt-4 lg:h-22'>Location</p>,
                            <p className='h-10 pt-0 text-center bg-farmer-green font-bold text-xs w-full lg:p-2 lg:pt-1 lg:h-22 lg:text-sm'>Harvest Season</p>,
                            <p className='rounded-tr-lg h-10 pt-0 w-full text-center bg-farmer-green font-bold text-xs px-8  lg:p-2 lg:pt-1 lg:h-22 lg:text-sm'>Harvest month</p>
                        ]}
                    >
                        {farmerData.crops.map(({ details, predictions, _id }, index) => {
                            return (
                                <TableBody
                                    details={[
                                        <p id={_id}>{details?.label}</p>,
                                        <p id={_id} className="flex flex-row justify-center">{_id}</p>,
                                        <p id={_id}>{details?.country || details?.Country}</p>,
                                        <p id={_id} className="flex flex-row justify-center">{predictions}</p>,
                                        <p id={_id} className="flex flex-row justify-center">{predictions && getmonths(predictions)}</p>
                                    ]
                                    }
                                    id={_id}
                                />
                            )
                        }
                        )}
                    </TableHead>
                </div>
            </div>
        </div>
    )
}

export default Report;