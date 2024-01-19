export type typeName = {
    name: string;
    language: string
}

export type typeDes = {
    des: string;
    language: string;
}
export type TypeCategory = {
    _id: string;
    name: typeName[];
    description: typeDes[];
    parent_id: string;
    url: string;
    page: string;
}

export type typeImage = {
    name: typeName[]
    url: string;
    description: typeDes[]
  }
export type TypeProduct = {
    _id: string;
  
    name: typeName[];
    description: typeDes[]
    price: number;
  
    images: typeImage[];
  
    category_id: string;
  
    discounts?: number;
    condition: string;
    size: string;
    weight: string;
    url: string;
  
  }

  interface StringTableProps {
    data: string;
}

export const StringTable: React.FC<StringTableProps> = ({ data }) => {
    const rows = data.split('\n').map((row, index) => {
        const cells = row.split('||').map((cell, cellIndex) => (
            <td key={cellIndex} className={index == 0 ? `font-semibold` : ''}>{cell}</td>
        ));

        return <tr key={index}>{cells}</tr>;
    });
    return (
        <table className="w-full table-fixed">
            <tbody>{rows}</tbody>
        </table>
    );
};