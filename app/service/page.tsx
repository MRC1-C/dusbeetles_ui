'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { RootState } from '../store';
import { useSelector } from 'react-redux';


const About = () => {
    const navigate = useRouter();
    const { dataServices } = useSelector((state: RootState) => (state.servicesState));
    const { language } = useSelector((state: RootState) => (state.appState));
    const pathname = usePathname()
    

    return (
        <div className='grid grid-cols-1 p-4 cursor-pointer'>
        {dataServices.map((dt,index) => <div key={index} onClick={() => navigate.push(pathname + "/" + dt.name[0].name)} className={`w-full border-0 border-b-[1px] border-[#E2E2E2] border-solid`}>
            <div className={'col-span-1 w-full flex flex-row justify-between'}>
                <div className='text-lg py-2'>{dt.name[language].name}</div>
                <div className='text-lg py-2 text-[#575757]'>{index==3?'2011-05-25':'2011-07-23'}</div>
            </div>
        </div>)}
    </div>
    )
}

export default About