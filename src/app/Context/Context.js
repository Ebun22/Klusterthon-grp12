"use client"

import React, { Dispatch, LegacyRef, ReactEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useContext, createContext } from "react";
import { useRouter } from 'next/navigation';

const LoginDetails ={
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPwd: ''
}
const MainCropDetails = {
    location: '',
    cropName: '',
}

const ExtraCropDetails = {
    temperature: 0,
    humidity: 0,
    pH: 0,
    waterAvalability: 0,
}

const Context = createContext(null);


export function useStateContext() {
    const store = useContext(Context);
    if (store === null) {
        throw new Error("State Error")
    }
    return store;
}

function StoreProvider({ children }) {
    const [userDetails, setUserDetails] = useState(LoginDetails);
    const [mainCropDetails, setMainCropDetails] = useState(MainCropDetails);
    const [extraCropDetails, setExtraCropDetails] = useState(ExtraCropDetails);
    const [hasAccount, setHasAccount] = useState(false);

    const handleClick = () => {
        setShowVote(true)
    }
    const router = useRouter();
    const handleVotes = (event) => {

        const newValue = event.target.value
        setVote(newValue)
        console.log(vote)
    }

    const value = {
        mainCropDetails,
        setMainCropDetails,
        extraCropDetails,
        setExtraCropDetails,
        hasAccount,
        setHasAccount,
        userDetails,
        setUserDetails
    }

    const Provider = Context.Provider
    return <Provider value={value}> {children} </Provider>
}

export default StoreProvider;