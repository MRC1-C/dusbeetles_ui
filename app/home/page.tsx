'use client'
import {  useSelector } from 'react-redux';
import { RootState } from '../store';
import Items from '../components/Items';
const Home = () => {
  const { language } = useSelector((state: RootState) => (state.appState));
  const { dataHome } = useSelector((state: RootState) => (state.homeState));

  return (
    <>
      <div className='flex flex-wrap'>
        {dataHome.map((dt: any) => <Items path={dt.name[0].name} type='V' key={dt._id} id={dt._id} name={dt?.name[language]?.name} url={dt.url} des={dt?.description[language]?.des} />)}
      </div>
    </>
  )
}

export default Home