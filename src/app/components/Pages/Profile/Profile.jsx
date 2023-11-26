'use client'
import React from 'react';
import { useStateContext } from '../../../Context/Context';

// import { FormWrapper, Header, AuthPage, SideBar } from '././components';

const Profile = () => {

  const { farmerData } = useStateContext();
  const {_id, email, firstName, lastName }  = farmerData.details


  return (
    <div className='flex flex-col ml-3 mt-6 p-8 w-full bg-white'>
      <div className='flex flex-col w-full '>
        <img
          src="/dummy-profile.png"
          className="rounded-full h-10"
          width={40}
          height={40}
          alt="profile pic"
        />
        <div>
          Number of Predictions: {farmerData.crops.length}
        </div>
      </div>
      <div>
        <p>Name: {`${firstName} ${lastName}`}</p>
        <p>Email: {email}</p>
      </div>
      <button type='button' className='bg-black rounded-lg text-white '>change password?</button>
    </div>
  )
}

export default Profile;