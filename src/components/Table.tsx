import React from 'react';

export type TableColumn = {
    label: string;
    dataKey: string;
    width: string;
    align: 'left' | 'center';
}

type TableProps = {
    columns: TableColumn[];
    data: Record<string, string | JSX.Element | number >[];
    emptyMessage?: string;
};

const Table: React.FC<TableProps> = ({ columns, data, emptyMessage = 'Tidak ada produk' }) => {
    if (!columns || !data || data.length === 0) {
        return <div className='px-8'>{emptyMessage}</div>;
    }

    return (
        <div className="flexCenter relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-white text-center">
                    <tr>
                        {columns.map((column, index) => (
                            <th 
                            key={index}
                            scope="col"
                            className={`px-4 py-3 w-${column.width} bold-14`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg_row_blue'} border-b`}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-4 py-2 ${column.align === 'center' ? 'text-center' : 'text-left'} medium-14`}
                                    style = {{ maxWidth: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {column.dataKey === 'aksi' ? row.aksi : row[column.dataKey]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;