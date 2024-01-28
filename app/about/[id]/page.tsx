'use client'
import { RootState } from '@/app/store';
import { Image } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ProductHome = () => {
    const { headerState, currentHeader, language } = useSelector((state: RootState) => (state.appState));
    const [data, setData] = useState<any>()
    useEffect(() => {
        if(currentHeader){
            axios.post('/api/category/detail', {
                id: headerState.filter(h => h.name[0].name == currentHeader)[0]?.id
            })
            .then(dt => setData(dt.data))
            .catch(err => console.log(err))
        }
    }, [headerState, currentHeader])
    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data?.id && <div>
                    <div className='font-semibold'>{data.name[language].name}</div>
                    <Image alt='image' className='py-8' width={'100%'} src={data.url} preview={false}></Image>
                    {
                            data.description[language].des.split('\n').map((d:any, index: any) => d[0]=='.'?<div key={index} className='font-bold'>{d.slice(1,)}</div>:<div key={index}><div>{d}</div><br /></div>)
                    }
                </div>

            }
        </div>
    )
}

export default ProductHome