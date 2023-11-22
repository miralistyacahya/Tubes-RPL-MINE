"use client"

import { useEffect, useState } from 'react';
import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '@/src/components/Table'
import Pagination from '@/src/components/Pagination'
import Button from '@/src/components/Button'
import Navbar from '@/src/components/Navbar';
import Filter from "@/public/icons/filter-button-top-table.svg"
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR } from '@/src/constants';
import { product } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import AddedButton from '@/src/components/AddButton';
import CartPage from '@/src/components/cart/CartPage';

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
    
    const [cart, setCart] = useState<(string | number)[][]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0)

    const handleButtonClick = (productCart: (string | number)[]) => {
        // Add the product to the cart
        // id product, name, price, qty
        setCart((prevCart) => {
            const existingProduct = prevCart.findIndex((item) => item[0] == productCart[0]);
            if (existingProduct != -1) {
                const newCart = [...prevCart];
                newCart[existingProduct][3] = Number(newCart[existingProduct][3]) + 1
                setCartTotal((prevTotal) => prevTotal + Number(newCart[existingProduct][2]));
                return newCart;
            } else {
                console.log("total awal", cartTotal)

                setCartTotal((prevTotal) => 
                { const updated = prevTotal + Number(productCart[2]);
                console.log("prev total after update:", updated);
                return updated;
                });

                return [...prevCart, [...productCart, 1]];
            }
        });
    }; 
    console.log("akhir bgt", cartTotal)


    const displayData = dataItem.map((product) => ({
        idproduct: product.idproduct || 'N/A',
        productname: product.productname || 'N/A',
        category: product.category || 'N/A',
        price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
        aksi: <AddedButton onButtonClick={() => handleButtonClick([product.idproduct, product.productname, product.price])} />,
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
                        <CartPage cart = { cart } cartTotal = { cartTotal }/>
                    </div>
                </div>
            </div>
        </div>
    )
}