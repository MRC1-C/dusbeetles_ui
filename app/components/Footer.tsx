'use client'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { header } from '../constant/pageHeader'
import Image from 'next/image'

const Footer = () => {
  const { appState, language } = useSelector((state: RootState) => (state.appState));
  const navigate = useRouter()
  return (
    <div className='container mx-auto text-white'>
      <div className='flex flex-col justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 p-3 border-b-[#202020] border-[0px] border-b-[1px] border-solid'>
          <div className='col-span-1 pb-6 md:pb-0'>
            <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate.push('/')}>
              <Image alt='logo' height={24} width={24} src={'/logo.png'} />
              <div className='pl-2 font-semibold'>DUS BEETLES</div>
            </div>
          </div>
          <div className='col-span-1 flex flex-col md:items-center'>
            <div className='flex flex-col gap-4'>
              {
                header.map(r => <div onClick={()=> navigate.push(r.path)} key={r.path} className='no-underline font-semibold cursor-pointer' style={{ color: appState == r.path ? 'white' : '#979797' }}>
                  {r.label && r.label[language]}
                </div>)
              }
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex flex-col pt-3 md:pt-0 md:items-end md:justify-end container mx-auto'>
              <div className='flex flex-col gap-3'>
                <div className='text-xs text-[#979797]'>
                  Liên Hệ
                </div>
                <div className='font-bold text-xs'>
                  <Image alt='phone' src={'/phone.png'} height={14} width={14} className='pr-1' />
                  0981093411
                </div>
                <div className='font-bold text-xs'>
                  <Image alt='map' src={'/map.png'} height={14} width={14} className='pr-1' />
                  {1 ? '06 Bùi Đạt, phường An Hưng, TP Thanh Hóa' : 'Store Address'}
                </div>
                <div className='w-full h-40 bg-white'>
                  <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15016.626371239125!2d105.72982512076418!3d19.79095689456106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f8385a153211%3A0x2ab0438ee603b47e!2zQW4gSG_huqFjaCwgVGhhbmggSG_DoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1684458079864!5m2!1svi!2s"></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='p-3 text-[#CDCDCD] text-xs'>
          MrCJ
        </div>
      </div>
    </div>
  )
}

export default Footer