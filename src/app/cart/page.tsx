"use client"

import { useEffect, useState } from 'react';
import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '@/src/components/Table'
import Pagination from '@/src/components/Pagination'
import Button from '@/src/components/Button'
import { AddedButton, MinButton, PlusButton, CloseButton } from '@/src/components/ActionButton';
import Navbar from '@/src/components/Navbar';
import Filter from "@/public/icons/filter-button-top-table.svg"
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR } from '@/src/constants';
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
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
    const pageVisitedTo = pageVisited + dataPerPage;

    useEffect (() => {
        const fetchData = async () => {
            try {
                const supabase =  createClient();
                const { data: totalCountResponse } = await supabase.from('product').select('count');
                setTotalCount(totalCountResponse?.[0]?.count || 0);
        
                console.log(totalCount);
            
                const newPageCount = Math.ceil(totalCount/dataPerPage)
                setPageCount(newPageCount);

                const { data: products, error } = await supabase.from('product').select().range(pageVisited, pageVisitedTo-1);

                if (products) {
                    setDataItem(products);
                }

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }

        };
        fetchData();
    },[pageVisited, pageVisitedTo, totalCount]);
    
  
    const displayData = dataItem.map((product) => ({
      idproduct: product.idproduct || 'N/A',
      productname: product.productname || 'N/A',
      category: product.category || 'N/A',
      price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
      aksi: <AddedButton />,
    }));

    const isAdmin = false;
    const isKasir = true;

    return (
        <div>
            <Navbar 
            listOfNav={
                (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : NAV_INVENTARIS))
            }
            />
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
                                        Showing <span className="font-medium">{pageVisited}</span> to <span className="font-medium">{pageVisitedTo > totalCount ? totalCount : pageVisitedTo}</span> of{' '}
                                        <span className="font-medium">{totalCount}</span> results
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
                        <div className="mt-20 bg-white shadow-md sm:rounded-lg">
                            <h1 className="heading bold-20 pt-4 pb-4 text-center">Keranjang</h1>
                            <div className="px-6" style={{height: "512px"}}>
                                {/* <div className="regular-16 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}><i>Tidak ada barang di keranjang</i></div> */}
                                <div className= "medium-14 text-[#737272]">Tanggal : 26/10/2023</div>
                                <div className= "medium-14 text-[#737272]">Pegawai Kasir : Toqeqrin</div>
                                <div className= "bold-14 grid grid-cols-2 text-center pt-4 pb-2 relative border-b">
                                    <p>Product</p>
                                    <p className="ml-6">Qty</p>
                                </div>

                                <div style={{height: "320px", overflowY: 'auto', overflowX: 'auto'}}>
                                    <div className="py-2 border-b">
                                        <div className="flex justify-between items-center">
                                            <div className="medium-14 py-1" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                                Pepsodent
                                            </div>
                                            <div className="flex items-center">
                                                <MinButton />
                                                <div className="medium-14 w-8 text-center">
                                                    10
                                                </div>
                                                <div className="mr-4">
                                                    <PlusButton />
                                                </div>
                                                <CloseButton />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center grid grid-cols-2">
                                            <div className="medium-12 text-[#A3A3A3] flex mr-auto">
                                                Rp1.000.000,00
                                            </div>
                                            <div className="semibold-12 w-28 ml-auto mr-7 text-right">
                                                Rp300.000,00
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2 border-b">
                                        <div className="flex justify-between items-center">
                                            <div className="medium-14 py-1" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                                Pepsodent Pepsodent Pepsodent Pepsodent  Pepsodent Pepsodent Pepsodent 
                                            </div>
                                            <div className="flex items-center">
                                                <MinButton />
                                                <div className="medium-14 w-8 text-center">
                                                    5
                                                </div>
                                                <div className="mr-4">
                                                    <PlusButton />
                                                </div>
                                                <CloseButton />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center grid grid-cols-2">
                                            <div className="medium-12 text-[#A3A3A3] flex mr-auto">
                                                Rp5.000,00
                                            </div>
                                            <div className="semibold-12 w-28 ml-auto mr-7 text-right">
                                                Rp1.000,00
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="pt-4 pb-2">
                                    <div className="flex justify-between semibold-16">
                                        <div>
                                            Total
                                        </div>
                                        <div>
                                            Rp1.000.000
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center grid grid-cols-2">
                                    <div>
                                        <Button
                                            type="button"
                                            title="Pembayaran Gagal"
                                            round="rounded-lg"
                                            variant="btn_red"
                                            size="bold-12"
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type="button"
                                            title="Pembayaran Berhasil"
                                            round="rounded-lg"
                                            variant="btn_green"
                                            size="bold-12"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}