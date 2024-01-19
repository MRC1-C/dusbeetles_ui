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

const Items = (props: PropsItems) => {
    const navigate = useRouter();
    const pathname = usePathname()
    return (
        <div onClick={() => navigate.push(pathname + "/" + props.path)} className={`w-full cursor-pointer border-0 border-b-[1px] border-[#E2E2E2] border-solid`}>
            <div className={'px-4 md:px-0 py-8 grid grid-cols-1 ' + (props.type == "H" ? 'md:grid-cols-1' : 'md:grid-cols-2').toString()}>
                <div className='col-span-1'>
                    <img alt="image" src={props.url} className='object-cover aspect-video w-full h-full rounded-xl' />
                </div>
                <div className={'col-span-1 ' + (props.type == "H" ? '' : 'md:p-8').toString()}>
                    <div className='font-bold text-xl py-2'>{props.name}</div>
                    <div>{props.price}</div>
                    <div>{props.des}</div>
                </div>
            </div>
        </div>
    )
}

export default Items