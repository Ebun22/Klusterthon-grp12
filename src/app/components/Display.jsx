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
                <div className='flex flex-row w-full min-h-full h-full'>
                    <SideBar />
                    <div className='flex flex-col w-full min-h-full bg-lime-50 overflow-x-hidden'>
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