'use client'
import { RootState } from '@/app/store';
import { StringTable } from '@/app/type/type';
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
    console.log(data)
    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data?.id && <div>
                    <div className='font-semibold'>{data.name[language].name}</div>
                    {
                        data.description[language].des.split('\n')[0] == "$T" ?
                            <StringTable data={data.description[language].des.slice(3,)} />
                            : <pre className='whitespace-pre-wrap'>{data.description[language].des}</pre>
                    }
                    <Image alt='image' className='py-8' width={'100%'} src={data.url} preview={false}></Image>
                </div>

            }
        </div>
    )
}

export default ProductHome