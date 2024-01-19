'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ItemsProduct from '../components/ItemsProduct';
const Product = () => {
    const { language } = useSelector((state: RootState) => (state.appState));
    const { dataCase } = useSelector((state: RootState) => (state.caseState));
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-2 md:px-0'>
            {dataCase.map(dt => <ItemsProduct path={dt.name[0].name} type='H' key={dt.id} id={dt.id} name={dt?.name[language]?.name} url={dt.url} des={dt?.description[language]?.des} />)}
        </div>
    )
}

export default Product