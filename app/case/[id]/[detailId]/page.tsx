'use client'
import { RootState } from "@/app/store";
import { StringTable } from "@/app/type/type";
import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductProductDeltail = ({ params }: { params: { detailId: string } }) => {
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
            }
        }
    }, [headerProductState, detailId])

    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data.id &&
                <div>
                    <div className='text-2xl font-semibold'>{data.name[language].name}</div>
                    <Image alt="image" className='py-8' src={data.url} width={'100%'} preview={false}></Image>
                    <pre className='pb-8 whitespace-pre-wrap'>{data.description[language].des}</pre>
                    {
                        data.images.map((img: any, idx: any) => <div key={idx}>
                            <pre className='text-2xl font-semibold'>{img.name[language].name}</pre>
                            {
                                img.url && <Image alt="image" className='py-8' width={'100%'} src={img.url} preview={false}></Image>
                            }
                            {
                                img.description[language].des.split('\n')[0] == "$T" ?
                                    <StringTable data={img.description[language].des.slice(3,)} />
                                    : <pre className='whitespace-pre-wrap'>{img.description[language].des}</pre>
                            }
                        </div>)
                    }
                </div>
            }
        </div >
    )
}

export default ProductProductDeltail