"use client"

import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '@/src/components/Table'
import Pagination from '@/src/components/Pagination'
import Button from '@/src/components/Button'
import { AddedButton } from '@/src/components/ActionButton';
import Filter from "@/public/icons/filter-button-top-table.svg"
import { useEffect, useState } from 'react';
import { product } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';

const columns: TableColumn[] = [
    { label: 'ID', dataKey: 'idproduct', width: '1/4', align: 'center' },
    { label: 'Nama Produk', dataKey: 'productname', width: '1/4', align: 'left' },
    { label: 'Kategori', dataKey: 'category', width: '1/4', align: 'left' },
    { label: 'Harga', dataKey: 'price', width: '1/4', align: 'center' },
    { label: '', dataKey: 'aksi', width: '1/4', align: 'center' },
];

export default function Cart() {
    const [dataItem, setDataItem] = useState<product[]>([]);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const supabase =  createClient();

                const { data: products, error } = await supabase.from('product').select();
            
                if (products) {
                    setDataItem(products);
                }

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }

        };
        fetchData();
    }, []);
    
    const [pageNumber, setPageNumber] = useState(0);

    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
  
    const displayData = dataItem.slice(pageVisited, pageVisited + dataPerPage).map((product) => ({
      idproduct: product.idproduct || 'N/A',
      productname: product.productname || 'N/A',
      category: product.category || 'N/A',
      price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
      aksi: <AddedButton />,
    }));

    const pageCount = Math.ceil(dataItem.length/dataPerPage);

    return (
        <div className="flexContainer">
            <div className="leftContent">
                <div style={{ marginLeft: '64px', marginRight: '32px' }}>
                    <h1 className="heading bold-28 mt-4">Daftar Produk</h1>
                    <div className="mt-6 mb-12 bg-white shadow-md sm:rounded-lg">
                        <div className="grid grid-cols-2">
                            <SearchBar containerWidth='w-full'/>
                            <div className="flex justify-end items-center pr-8 my-4">
                                <Button
                                    type="button"
                                    title="Semua Kategori"
                                    icon={Filter}
                                    round="rounded-lg"
                                    variant="btn_blue"
                                    size="semibold-14"
                                />
                            </div>
                        </div>
                        <Table columns={columns} data={displayData}/>
                        <div className='grid grid-cols-2 items-center'>
                            <div className='hidden lg:flex'>
                                <p className="text-sm text-gray-700 pl-8">
                                    Showing <span className="font-medium">{pageVisited}</span> to <span className="font-medium">{pageVisited + dataPerPage}</span> of{' '}
                                    <span className="font-medium">{dataItem.length}</span> results
                                </p>
                            </div>
                            <div className='col-start-2 flex justify-end'>
                                <Pagination 
                                setPageNumber={setPageNumber}
                                currentPage={pageNumber}
                                pageCount={pageCount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightContent">
                <div style={{ marginRight: '64px'}}>
                    <div className="mt-20 mb-12 bg-white shadow-md sm:rounded-lg" style={{ minHeight: '93vh' }}>
                        <h1 className="heading bold-20 pt-4 text-center">Keranjang</h1>
                        <div>
                            <div className="regular-16 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}><i>Tidak ada barang di keranjang</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}