'use client'
import { RootState } from "@/app/store";
import { StringTable } from "@/app/type/type";
import { Image, Tabs } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProductProductDeltail = ({ params }: { params: { detailId: string } }) => {
    const { detailId } = params
    const [data, setData] = useState<any>({} as any)
    const { language, headerProductState, headerState, currentHeader } = useSelector((state: RootState) => (state.appState))

    useEffect(() => {
        if (headerProductState.length > 0) {
            const dt = headerProductState.filter((dt: any) => {
                if (dt) {
                    return dt.name[0].name == detailId
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
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (divRef.current) {
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                const marginTop = scrollPosition;
                divRef.current.style.top = `${marginTop - 200 > 0 ? marginTop - 200 : 0}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data.id &&
                <div className='w-full h-full'>
                    <div className='grid col-span-1 md:grid-cols-5 gap-6 py-11'>
                        <img alt="image" src={data.url} className='col-span-3 w-full aspect-[6/4] object-cover rounded-xl'></img>
                        <div
                            className='col-span-3 md:col-span-2 relative'>
                            <div ref={divRef} className='md:absolute right-0 w-full'>
                                <div className='p-3 md:p-6 bg-white rounded-xl flex flex-col gap-4'>
                                    <p className='text-lg text-[#1C1F23] font-semibold'>{headerState.find(h => h.name[0].name == currentHeader)?.name[language].name}</p>
                                    <p className='text-3xl font-bold'>{data.name[language].name}</p>
                                    <p>{data.condition}</p>
                                    <div className='flex flex-row'><p className='text-xs text-[#575757] font-semibold pr-1' >Size:</p> <p className='text-xs text-[#1C1F23] font-semibold'>{data.size}</p></div>
                                    <div className='flex flex-row'><p className='text-xs text-[#575757] font-semibold pr-1' >Weight:</p> <p className='text-xs text-[#1C1F23] font-semibold'>{data.weight}</p></div>
                                    <p className='text-xl font-bold pt-2' style={{ borderTop: '1px solid lightgray' }}>{new Intl.NumberFormat('en-DE').format(data.price) + ' đ'}</p>
                                    <pre className='whitespace-pre-wrap'>{data.description[language].des}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-3/5'>
                        <Tabs
                            defaultActiveKey="0"
                            items={data.images.map((img: any, i: any) => {
                                const id = String(i);
                                return {
                                    label: `${img.name[language].name ? img.name[language].name : id}`,
                                    key: id,
                                    children: <div>
                                        {
                                            img.description[language].des.split('\n')[0] == "$T" ?
                                                <StringTable data={img.description[language].des.slice(3,)} />
                                                : img.description[language].des && <pre className='whitespace-pre-wrap pb-3'>{img.description[language].des}</pre>
                                        }
                                        <Image alt="image" className='w-full' width={'100%'} src={img.url} loading='eager' preview={false} />
                                    </div>,
                                    style: { minHeight: 500 }
                                };
                            })}
                        />
                    </div>
                </div>
            }
        </div >
    )
}

export default ProductProductDeltail