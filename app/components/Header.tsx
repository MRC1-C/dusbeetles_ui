'use client'
import React, { useEffect, useState } from 'react'
import { Drawer, Select, Input } from 'antd'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { CloseCircleOutlined, CloseOutlined, MenuUnfoldOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { RootState } from '../store'
import { usePathname, useRouter } from 'next/navigation'
import { header } from '../constant/pageHeader'
import { clearStateApp, setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState, setLangauge } from '../store/features/appStateSlice'
import { setDataHome, setDataProductHome } from '../store/features/homeStateSlice'
import axios from 'axios'
import { setDataProduct, setDataProductProduct } from '../store/features/productStateSlice'
import Image from 'next/image'
import { setDataAbout } from '../store/features/aboutStateSlice'
import { setDataCase, setDataProductCase } from '../store/features/caseStateSlice'
import { setDataServices } from '../store/features/servicesStateSlice'
const { Search } = Input;
const Header = () => {
    const { appState, headerState, headerProductState, currentHeader, currentHeaderProduct, language } = useSelector((state: RootState) => (state.appState));
    const [open, setOpen] = useState(false);
    const [opneMenu, setOpenMenu] = useState(false)
    const [dataSearch, setDataSearch] = useState<Array<any>>([] as Array<any>)
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch()
    const pathname = usePathname()

    useEffect(() => {
        const path_ = pathname.split('/')
        if ("/" + path_[1] !== appState) {
            dispatch(clearStateApp())
        }
        if (path_[1] !== '') {
            axios.post("/api/category", {
                page: path_[1]
            })
                .then(dt => {
                    if (dt.data) {
                        dispatch(setHeaderState(dt.data.map(((dt: any) => ({ name: dt.name, id: dt.id })))))
                        if (path_[1] == 'home') {
                            dispatch(setDataHome(dt.data))
                        }
                        else if (path_[1] == 'products') {
                            dispatch(setDataProduct(dt.data))
                        }
                        else if (path_[1] == 'about') {
                            dispatch(setDataAbout(dt.data))
                        }
                        else if (path_[1] == 'case') {
                            dispatch(setDataCase(dt.data))
                        }
                        else if (path_[1] == 'service') {
                            dispatch(setDataServices(dt.data))
                        }
                        dispatch(setAppState("/" + path_[1]))
                        if (path_[2]) {
                            axios.post("/api/product", {
                                category_id: dt.data.find((h: any) => h.name[0].name == decodeURIComponent(path_[2]))?.id
                            })
                                .then(dt_ => {
                                    if (dt_.data) {
                                        if (path_[1] == 'home') {
                                            dispatch(setDataProductHome(dt_.data))
                                        }
                                        else if (path_[1] == 'products') {
                                            dispatch(setDataProductProduct(dt_.data))
                                        }
                                        else if (path_[1] == 'case') {
                                            dispatch(setDataProductCase(dt_.data))
                                        }
                                        dispatch(setHeaderProductState(dt_.data.map((dt: any) => ({ name: dt.name, id: dt.id }))))
                                        dispatch(setCurrentHeaderState(decodeURIComponent(path_[2])))
                                        if (path_[3]) {
                                            dispatch(setCurrentHeaderProductState(decodeURIComponent(path_[3])))
                                        }
                                        else {
                                            dispatch(setCurrentHeaderProductState(''))
                                        }
                                    }
                                })
                        }
                        else {
                            dispatch(setHeaderProductState([]))
                            dispatch(setCurrentHeaderState(''))
                        }

                    }
                    else {
                        dispatch(setHeaderState([]))
                        dispatch(setAppState(''))
                    }
                })
        }
    }, [pathname, dispatch])

    useEffect(() => {
        (async () => {
            const _data = await axios.post('/api/product/search', {
                query: "",
                take: 5,
            })
            setDataSearch(_data.data)
        })()
    }, [])
    const navigate = useRouter()
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const showMenu = () => {
        setOpenMenu(true);
    };

    const onCloseMenu = () => {
        setOpenMenu(false);
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Đăng ký sự kiện lắng nghe thay đổi kích thước cửa sổ
        window.addEventListener('resize', handleResize);

        // Loại bỏ sự kiện lắng nghe khi component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='bg-black z-[1001]'>
            <div className='bg-black text-white px-3 py-6'>
                <div className='container mx-auto flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate.push('/home')}>
                        <Image alt='logo' src='/logo.png' width={24} height={24} />
                        <div className='text-2xl pl-2 font-semibold'>DUS BEETLES</div>
                    </div>
                    <div className='flex flex-row gap-6 justify-between items-center'>
                        {
                            windowSize.width > 1024 ? header.map(r => <div onClick={() => navigate.push(r.path)} key={r.path} className='no-underline font-semibold cursor-pointer' style={{ color: appState == r.path ? 'white' : '#979797' }}>
                                {r.label && r.label[language]}
                            </div>) : null
                        }
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <Image alt='shape' src={'/shape.png'} className='cursor-pointer' onClick={() => showDrawer()} width={20} height={20} />
                        {
                            windowSize.width > 1024 ?
                                <div className='w-28 flex justify-end items-center'>
                                    <Select variant={'borderless'} value={language == 0 ? "Tiếng việt" : "English"} onChange={(e) => {
                                        dispatch(setLangauge(+e))
                                    }
                                    } options={[
                                        { value: 0, label: 'Tiếng việt' },
                                        { value: 1, label: 'English' },
                                    ]} />
                                </div> :
                                opneMenu ? <CloseOutlined className='text-xl pl-3 text-[#979797] cursor-pointer' onClick={() => onCloseMenu()} /> :
                                    <MenuUnfoldOutlined className='text-xl pl-3 text-[#979797] cursor-pointer' onClick={() => showMenu()} />
                        }
                    </div>
                </div>

            </div>
            {
                (!open && !opneMenu) &&
                <div className='bg-black text-white z-[1]'>
                    <div className='container mx-auto flex flex-row md:gap-1 flex-wrap'>
                        {
                            headerState.map((dt: any) => (
                                <div key={dt.id} onClick={() => navigate.push(appState + '/' + dt.name[0].name)} className='text-xs no-underline py-3 px-3 cursor-pointer' style={{ color: dt.name[0].name == currentHeader ? 'white' : '#979797' }}>{dt.name[language].name}</div>

                            ))
                        }
                    </div>
                </div>
            }
            {
                (!open && !opneMenu) &&
                <div className='bg-[#F5F5F7] text-[#575757] z-[1]'>
                    <div className='container mx-auto flex flex-row md:gap-1 flex-wrap'>
                        {
                            headerProductState.map((dt: any) => {
                                return (
                                    <div key={dt.id} onClick={() => navigate.push(appState + '/' + currentHeader + '/' + dt.name[0].name)} className='text-xs no-underline py-3 px-3 cursor-pointer' style={{ color: dt.name[0].name == currentHeaderProduct ? 'black' : '#979797' }}>{dt.name[language].name}</div>
                                )
                            })
                        }

                    </div>
                </div>
            }
            <Drawer
                placement={'top'}
                closable={false}
                onClose={onClose}
                open={open}
                style={{ backgroundColor: 'black', paddingTop: 100 }}
            >

                <div className='container mx-auto flex flex-row items-center gap-3'>
                    <Search value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={value => {
                            navigate.push('/find?q=' + value);
                            onClose();
                            setSearchValue('');
                        }} /> <CloseCircleOutlined className='text-white text-2xl cursor-pointer' onClick={() => onClose()} />
                </div>
                <div className='container mx-auto'>
                    <div className='text-white py-2 font-semibold text-lg'> {language == 0 ? 'Sản phẩm mới' : 'New Products'}</div>
                    {
                        dataSearch.map((dt, index) => <div key={index} className='text-white py-2 cursor-pointer px-1 rounded hover:bg-slate-900' onClick={() => {
                            navigate.push("/" + dt.path + '/' + dt.name[0].name);
                            onClose();
                        }}>{dt.name[language].name}</div>)
                    }
                </div>
            </Drawer>
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onCloseMenu}
                open={opneMenu}
                style={{ backgroundColor: 'black', width: '100vw', paddingTop: 100 }}
            >
                <div className='flex flex-col min-h-[100%]'>
                    <div className='flex flex-col gap-3'>
                        {
                            header.map(r => <div onClick={() => {navigate.push(r.path), onCloseMenu()}} key={r.path} className='no-underline text-2xl font-semibold' style={{ color: appState == r.path ? 'white' : '#979797' }}>
                                {r.label && r.label[language as number]}
                            </div>)
                        }
                    </div>
                    <div className='flex-auto'></div>
                    <div className='text-white'>
                        <div className='w-28 flex justify-start pb-2'>
                            <Select variant={'borderless'} value={language == 0 ? "Tiếng việt" : "English"} onChange={(e) => {
                                dispatch(setLangauge(+e))
                            }
                            } options={[
                                { value: 0, label: 'Tiếng việt' },
                                { value: 1, label: 'English' },
                            ]} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='font-bold text-xs'>
                                <Image src={'/phone.png'} alt='phone' width={14} height={14} className='pr-1' />
                                0927.20.20.20
                            </div>
                            <div className='font-bold text-xs'>
                                <Image src={'/map.png'} alt='map' width={14} height={14} className='pr-1' />
                                06 Bùi Đạt, phường An Hưng, TP Thanh Hóa
                            </div>
                        </div>
                    </div>

                </div>
            </Drawer>
        </div>
    )
}

export default Header