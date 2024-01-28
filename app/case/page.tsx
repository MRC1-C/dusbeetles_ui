'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Product = () => {
    const navigate = useRouter();
    const { headerState } = useSelector((state: RootState) => (state.appState));

    useEffect(() => {
        if (headerState.length > 0) {
            try {
                navigate.push("/case/" + headerState[0].name[0].name)
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

export default Product