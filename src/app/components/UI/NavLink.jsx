"use client"
import React, { ReactEventHandler, useState, useEffect } from 'react';
import Link from 'next/link';
import { GoHome, GoGear } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { useSearchParams } from 'next/navigation';
import { useStateContext } from '../../Context/Context';

const NavLink = ({ icon, label }) => {

    const { pathName, setPathName } = useStateContext()
    const searchParams = useSearchParams();
    const params = searchParams.get('')

    useEffect(()=> {
        setPathName(params);
    }, [params])
    
    return (
        <>
            {label?.map((name, index) => {
                return (
                    <div key={index} className={`flex flex-row  p-4 ${window.location.pathname.includes(name) ? 'bg-lime-100 text-black rounded-md' : 'text-white'}`} >
                        <span className='mt-1 mr-3.5'>{icon[index]}</span>
                        <Link href={`/${name}`} className="font-bold">{name}</Link>
                    </div >
                )
            })
            }
        </>
    )
}

export default NavLink;

//${isActive() ? ' bg-white pl-2 rounded-s-full rounded-e-none text-black' : ""