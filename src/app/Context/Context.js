"use client"

import React, { Dispatch, LegacyRef, ReactEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
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

function persistForm() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return LoginDetails;
  return JSON.parse(storedUser)
}

function persistLogin() {
  const storedState = localStorage.getItem('isLoggedIn');
  if (!storedState) return false;
  return true
}

function StoreProvider({ children }) {

  const [farmerData, setFarmerData] = useState({ details: {}, crops: [] })
  const [userDetails, setUserDetails] = useState(persistForm);
  const [cropDetails, setCropDetails] = useState(CropDetails);
  const [hasAccount, setHasAccount] = useState(false);
  const [store, setStore] = useState(null);
  const [isUser, setIsUser] = useState(persistLogin);
  const [showResult, setShowResult] = useState(false);
  const [pathName, setPathName] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userDetails))
  }, [userDetails])

  useEffect(() => {
    const storedState = localStorage.getItem('isLoggedIn');
    if (!storedState) return false;
    setIsUser(true);
    setStore(storedState.token);

  }, [])

  console.log(isUser, store);

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
        console.log(data.message)
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

        const logInDetails = {
          IsUser: true,
          token: data.token
        }
        localStorage.setItem('isLoggedIn', JSON.stringify(logInDetails))

        const storedState = localStorage.getItem('isLoggedIn');
        setIsUser(true)

        setUserDetails(prev => ({ ...prev, ...data.farmer.details }));
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.warning("Network connection issues");
    }
  };

  const getUserDetails = async () => {
    const storedState = JSON.parse(localStorage.getItem('isLoggedIn'));
    const token = storedState.token;
    console.log(storedState.token)
    try {
      const response = await fetch('https://hackathon-klusterthon-group.vercel.app/farmer/details', {
        method: 'GET',
        headers: {
          'Authorization': 'X ' + token,
        }
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log(data)
        setFarmerData({...data});
        console.log(farmerData.crops.length)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.warning("Network connection issues");
    }
  };

useEffect(() => {
  getUserDetails();
  }, [])

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

  // useEffect(() => {
  //   getPrediction();
  // }, [])

  const value = {
    cropDetails,
    setCropDetails,
    hasAccount,
    setHasAccount,
    isUser,
    setIsUser,
    userDetails,
    pathName,
    showResult,
    farmerData,
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