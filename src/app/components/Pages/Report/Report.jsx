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
import { useStateContext } from '../../../Context/Context';
import { DetailsBox } from '../../UI';
import TableHead from '../../UI/TableHead';
import TableBody from '../../UI/TableBody';

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
        <div className='flex flex-col w-full h-full bg-white'>
            <div className="flex flex-row w-3/4 bg-lime-50 rounded-lg py-6 px-6 mx-auto mt-4 pl-8">
                <DetailsBox icon={<PiGrains />} number={40} title='Number of Crops' />
                <p className="border border-1-slate-600 mx-6"></p>
                <DetailsBox icon={<MdLocationPin />} number={69} title='Number of Locations' />
                <p className="border border-1-slate-600 mx-6"></p>
                <DetailsBox icon={<LuUsers2 />} number={20} title='Number of Users' />
            </div>
            <div className="flex flex-row w-3/4 rounded-lg py-6 px-6 mx-auto mt-4 pl-8">
                <Bar
                    options={options}
                    data={data}
                />
            </div>
            <div className="flex flex-row w-full rounded-lg py-6 px-6 mx-auto mt-4 pl-8">
                <div>

                    <TableHead
                        head={[
                            <p className='rounded-s-lg overflow-hidden w-full p-4 bg-lime-50'>Crop name</p>,
                            <p className='p-4 bg-lime-50'>ID</p>,
                            <p className='p-4 bg-lime-50'>Location</p>,
                            <p className='rounded-e-lg p-4 bg-lime-50'>Harvest Season</p>]}
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
                <div>

                    <div>
                        <p>Crop Details</p>
                        <p>{cropDetails.id}</p>
                    </div>
                    <div>
                        <p>Crop Name: {cropDetails.label}</p>
                        <p>Location: {cropDetails.location}</p>
                        <p>Temperature: {cropDetails.temperature}</p>
                        <p>Atmospheric Humidity: {cropDetails.humidity}</p>
                        <p>Soil pH: {cropDetails.pH}</p>
                        <p>Water Availability: {cropDetails.waterAvailability}</p>
                        <p>Harvest season: {cropDetails.season}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;