'use client'
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'

import { Image } from 'antd'
import { RootState } from '@/app/store';
import axios from 'axios';
import { StringTable } from '@/app/type/type';



const ProductDetail = ({ params }: { params: { detailId: string } }) => {
    const { detailId } = params
    const [data, setData] = useState<any>({} as any)
    const { language, headerProductState } = useSelector((state: RootState) => (state.appState))

    useEffect(() => {
        if (headerProductState.length > 0) {
            const dt = headerProductState.filter((dt: any) => {
                if (dt) {
                    return dt.name[0].name == decodeURIComponent(detailId)
                }
                return false
            })
            if (dt[0]) {
                axios.post('/api/product/detail', {
                    id: dt[0].id
                })
                .then(d => setData(d.data))
                .catch(err => console.log(err))
            }
        }
    }, [headerProductState, detailId])
    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data.id ?
                    <div>
                        <div className='text-2xl font-semibold'>{data.name[language].name}</div>
                        <Image alt='image' className='py-8' src={data.url} width={'100%'} preview={false}></Image>
                        <pre className='pb-8 whitespace-pre-wrap'>{data.description[language].des}</pre>
                        {
                            data.images.map((img: any, index: any) => <div key={index}>
                                <pre className='text-2xl font-semibold'>{img?.name[language]?.name}</pre>
                                <div className='w-full'>
                                    {
                                        img.url && <img alt='image' className={'py-8 w-full ' + (img?.description[language]?.des.split('\n')[0] == "$T" ? 'md:w-1/3 object-contain' : 'md:w-full object-cover')} src={img?.url} ></img>
                                    }
                                </div>
                                {
                                    img?.description[language]?.des.split('\n')[0] == "$T" ?
                                        <StringTable data={img.description[language].des.slice(3,)} />
                                        : <pre className='whitespace-pre-wrap'>{img?.description[language]?.des}</pre>
                                }
                            </div>)
                        }
                    </div>
                    : null
            }
        </div >
    )
}

export default ProductDetail