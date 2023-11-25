"use client"
import { FormWrapper, Header, AuthPage, SideBar, Analysis, Profile, Report, Settings } from '../components';
import { useStateContext } from '../Context/Context';

const Display = () => {

    const { isUser, pathName } = useStateContext();
    console.log(pathName)
    return (
        <>
            {/* {
        isUser ?
          ( */}
{/* {          
                } */}
                <div className='flex flex-row w-full h-full'>
                    <SideBar />
                    <div className='flex flex-col w-full h-screen bg-lime-50 overflow-hidden'>
                    <Header />
                    {pathName == "home" && <Profile />}
                    {pathName == "analysis" && <Analysis />}
                    {pathName == "reports" && <Report />}
                    {pathName == "settings" && <Settings />}
                    {/*  */}
                    {/* <FormWrapper /> */}
                    </div>
                    
                </div>

            {/* //       ) :
    //       <AuthPage />
    //   } */}

        </>
    )
}

export default Display;