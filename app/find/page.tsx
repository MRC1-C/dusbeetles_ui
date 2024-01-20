'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ItemsProduct from '../components/ItemsProduct'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Image } from 'antd'

const Page = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('q')
    const [data, setData] = useState<any>([])
    const { language } = useSelector((state: RootState) => (state.appState))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.post('/api/product/search', {
            query: search,
            take: 20
        })
            .then(dt => setData(dt.data))
            .catch(err => console.log(err))
            .finally(()=>setLoading(false))
    }, [search])

    if(loading){
        return <div></div>
    }
    return (
        <div className='min-h-screen'>
            {
                data.length > 0 ?
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-3 md:px-0'>
                        {

                            data.map((dt: any) => <ItemsProduct path={dt.name[0]?.name} price={dt?.price.toString()} des={dt.description[language].des} type='H' search={dt.path} key={dt.id.toString()} id={dt.id} name={dt.name[language].name} url={dt.url} />)
                        }
                    </div> :
                    <div className='w-full min-h-screen flex justify-center items-center'>
                        <Image alt='notfound' src={'/not.png'} className='my-auto' width={'60%'} preview={false} />
                    </div>
            }
        </div>
    )
}

export default Page