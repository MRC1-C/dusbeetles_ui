import { usePathname, useRouter } from "next/navigation";

export type PropsItems = {
    name: string,
    des?: string,
    url?: string,
    id: string,
    type?: string,
    price?: string,
    path: string,
}

const ItemsProduct = (props: PropsItems) => {
    const navigate = useRouter();
    const pathname = usePathname()

    return (
        <div onClick={() => navigate.push(pathname + "/" + props.path)} className={`w-full cursor-pointer`}>
            <div className={'p-3 md:p-6 bg-white grid grid-cols-1 ' + (props.type == "H" ? 'md:grid-cols-1' : 'md:grid-cols-2').toString()}>
                <div className='col-span-1'>
                    <img alt="image" src={props.url} className='object-cover aspect-video w-full h-full rounded-xl' />
                </div>
                <div className={'col-span-1 ' + (props.type == "H" ? '' : 'md:p-8').toString()}>
                    <div className='font-semibold text-xl py-2'>{props.name}</div>
                    <div className='font-semibold'>{props.price && new Intl.NumberFormat('en-DE').format(Number(props.price))}</div>
                    <div>{props.des}</div>
                </div>
            </div>
        </div>
    )
}

export default ItemsProduct
