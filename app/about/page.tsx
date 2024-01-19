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
        try {
            navigate.push("/about/"+headerState[0].name[0].name)
        } catch (error) {
            console.log(error)
        }

    }, [headerState, navigate])

    return (
        <Skeleton />
    )
}

export default About