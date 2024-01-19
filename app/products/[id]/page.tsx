'use client'
import Items from '@/app/components/Items';
import ItemsProduct from '@/app/components/ItemsProduct';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const ProductHome = () => {
    const { dataProductProduct } = useSelector((state: RootState) => (state.productState));
    const { language } = useSelector((state: RootState) => (state.appState));


    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-3 md:px-0'>
            {dataProductProduct.map((dt:any) => <ItemsProduct path={dt.name[0]?.name} price={dt?.price.toString()} des={dt.description[language].des} type='H' key={dt.id.toString()} id={dt.id} name={dt.name[language].name} url={dt.url} />)}
        </div>
    )
}

export default ProductHome