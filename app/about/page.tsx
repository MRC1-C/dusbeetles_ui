'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';


const About = () => {
    const navigate = useRouter();
    const { headerState } = useSelector((state: RootState) => (state.appState));

    useEffect(() => {
        if (headerState.length > 0) {
            try {
                navigate.push("/about/" + headerState[0].name[0].name)
            } catch (error) {
                console.log(error)
            }
        }
    }, [headerState, navigate])

    return (
        <div className='p-2'>
        </div>
    )
}

export default About