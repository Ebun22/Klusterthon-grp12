"use client"

import React, { Dispatch, LegacyRef, ReactEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useContext, createContext } from "react";
import { useRouter } from 'next/navigation';

const LoginDetails = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPwd: ''
}

const CropDetails = {
  location: '',
  cropName: '',
  temperature: 0,
  humidity: 0,
  pH: 0,
  waterAvailability: 0,
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
  const [cropDetails, setCropDetails] = useState(CropDetails);
  const [hasAccount, setHasAccount] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pathName, setPathName] = useState('');
  const [err, setErr] = useState('');

  const router = useRouter();

  const postUserDetails = async () => {
    console.log('This is the post function')
    try {
      const response = await fetch('https://hackathon-klusterthon-group.vercel.app/farmer/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success("Please Login with your details");
        setHasAccount(true);
      } else {
        setErr(data.message)
      }
    } catch (error) {
      toast.warning("Network connection issues");
    }
  };

  const handleLogin = async () => {
    console.log('This is the post function')
    try {
      const response = await fetch('https://hackathon-klusterthon-group-12.vercel.app/farmer/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (data.message === "Successful") {
        setIsUser(true);
        setUserDetails(prev => ({ ...prev, firstName: data.details.firstName }));
      } else {
        setErr(data.message)
      }
    } catch (error) {
      toast.warning("Network connection issues");
    }
  };

  const getPrediction = async () => {
    const details = {
      label: "cotton",
      Country: "Nigeria",
      temperature: 25.5,
      humidity: 80.0,
      waterAvailability: 0.6,
      ph: 6.5
    }
    try {
      const response = await fetch('https://prediction-engine-practice.onrender.com/predict_classification/', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();
      console.log(response)
      console.log(data)
    } catch (error) {
      toast.warning("Network connection issues");
    }
  };

  useEffect(() => {
    getPrediction();
  },[])

  const value = {
    cropDetails,
    setCropDetails,
    hasAccount,
    setHasAccount,
    isUser,
    userDetails,
    pathName,
    showResult, 
    setShowResult,
    setPathName,
    postUserDetails,
    handleLogin,
    setUserDetails
  }

  const Provider = Context.Provider
  return <Provider value={value}> {children} </Provider>
}

export default StoreProvider;