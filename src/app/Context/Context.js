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
  Country: '',
  label: '',
  temperature: 0,
  humidity: 0,
  ph: 0,
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
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return LoginDetails;
    return JSON.parse(storedUser)
  } return LoginDetails
}

function persistLogin() {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('isLoggedIn');
    if (!storedState) return;
    return true
  };
}

function StoreProvider({ children }) {

  const [farmerData, setFarmerData] = useState({ details: {}, crops: [] })
  const [URL, setURL] = useState('')
  const [prediction, setPrediction] = useState('')
  const [userDetails, setUserDetails] = useState(persistForm);
  const [cropDetails, setCropDetails] = useState(CropDetails);
  const [hasAccount, setHasAccount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState(null);
  const [isUser, setIsUser] = useState(persistLogin);
  const [showResult, setShowResult] = useState(false);
  const [pathName, setPathName] = useState('');
  const [err, setErr] = useState('');

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userDetails))
  }, [userDetails])

  useEffect(() => {
    const storedState = localStorage.getItem('isLoggedIn');
    if (!storedState) return;
    setIsUser(true);
    setStore(storedState.token);

  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedState = JSON.parse(localStorage.getItem('isLoggedIn'));
      const token = storedState?.token;
      setStore(token);
    }
  }, [userDetails])



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
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Network connection issues");
    }
  };

  const handleLogin = async () => {
    console.log('This is the post function')

    setIsLoading(true)
    try {
      const response = await fetch('https://hackathon-klusterthon-group-12.vercel.app/farmer/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      console.log(response.status)
      setIsLoading(false)
      if (data.message === "Successful") {

        const logInDetails = {
          IsUser: true,
          token: data.token
        }
        localStorage.setItem('isLoggedIn', JSON.stringify(logInDetails))
        
        router.push("/Analysis")
        setIsUser(true)
        console.log(data)
        console.log(data.farmer.details)
        //setUserDetails(prev => ({ ...prev, ...data.farmer.details }));
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Network connection issues");
    }
  };

  const getUserDetails = async () => {

    try {
      const response = await fetch('https://hackathon-klusterthon-group.vercel.app/farmer/details', {
        method: 'GET',
        headers: {
          'Authorization': 'X ' + JSON.parse(localStorage.getItem('isLoggedIn')).token,
        }
      });
      console.log(store)
      const data = await response.json();
      if (response.status === 200) {
        console.log(data)
        setFarmerData({ ...data });
        console.log(farmerData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Network connection issues");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [])

  useEffect(() => {
    getUserDetails();
  }, [prediction])

  const getPrediction = async () => {
    let details
    if (cropDetails.temperature === 0) {
      details = {
        Country: cropDetails.Country,
        label: cropDetails.label,
        id: farmerData.details._id
      }
      setURL('http://hackathon-klusterthon-group.vercel.app/crop/get_prediction')
    } else {
      details = { ...cropDetails, id: farmerData.details._id }
      setURL('http://hackathon-klusterthon-group.vercel.app/crop/get_prediction')
    }
    console.log(farmerData, cropDetails)
    console.log(details)
    setShowResult(true)
    try {
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (response.status === 200) {
        setPrediction(data.predictions[0])
        setShowResult(true)
      }
    } catch (error) {
      toast.error("Network connection issues");
    }
  };
  console.log(farmerData.details.id)

  const value = {
    cropDetails,
    setCropDetails,
    hasAccount,
    setHasAccount,
    isUser,
    setIsUser,
    isVisible,
    setIsVisible,
    userDetails,
    pathName,
    showResult,
    farmerData,
    prediction,
    isLoading,
    setShowResult,
    setPathName,
    getPrediction,
    postUserDetails,
    handleLogin,
    setUserDetails
  }

  const Provider = Context.Provider
  return <Provider value={value}> {children} </Provider>
}

export default StoreProvider;