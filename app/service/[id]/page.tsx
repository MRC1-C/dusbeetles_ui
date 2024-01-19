'use client'
import { RootState } from '@/app/store';
import { StringTable } from '@/app/type/type';
import { Button, Image, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProductHome = ({ params }: { params: { id: string } }) => {
    const { headerState, currentHeader, language } = useSelector((state: RootState) => (state.appState));
    const [data, setData] = useState<any>()
    const Feedback = () => {
        const [input, setInput] = useState<string>('')
        return <>
            <div className='py-3 w-1/2 md:w-1/3'>
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder={!language ? 'Nhận xét' : 'Feedback'} />
            </div>
            <Button onClick={() => setInput('')} className='bg-black text-white font-semibold'>{!language ? 'Gửi' : "Send"}</Button>
        </>
    }
    useEffect(() => {
        if (currentHeader) {
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
                data.id && <div>
                    <div className='font-semibold'>{data.name[language].name}</div>
                    {
                        data.description[language].des.split('\n')[0] == "$T" ?
                            <StringTable data={data.description[language].des.slice(3,)} />
                            : <pre className='whitespace-pre-wrap'>{data.description[language].des}</pre>
                    }
                    {
                        data.url && <div className='w-full md:w-1/2'>
                            <Image alt='image' preview={false} width={'100%'} className='py-4' src={data.url}></Image>
                        </div>
                    }
                    {
                        params.id == "Lời phản hồi" ? <Feedback /> : null
                    }
                </div>

            }
        </div>
    )
}

export default ProductHome