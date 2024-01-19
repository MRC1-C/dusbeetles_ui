'use client'
import Items from '@/app/components/Items';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const ProductHome = () => {
  const { dataProductHome } = useSelector((state: RootState) => (state.homeState));
  const { language } = useSelector((state: RootState) => (state.appState));


  return (
    <>
      {
        dataProductHome.map((dt: any) => <Items path={dt.name[0].name} type='V' key={dt.id.toString()} id={dt.id} des={dt.description[language].des} name={dt.name[language].name} url={dt.url} />)
      }
    </>
  )
}

export default ProductHome