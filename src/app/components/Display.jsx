"use client"
import { FormWrapper, Header, AuthPage, SideBar, Analysis, Profile, Report, Settings } from '../components';
import { useStateContext } from '../Context/Context';

const Display = () => {

    const { isUser, pathName } = useStateContext();
    console.log(pathName)
    return (
        <>

            <AuthPage />

        </>
    )
}

export default Display;