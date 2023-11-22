"use client"

import ActionButton from "@/src/components/ActionButton";
import Button from "@/src/components/Button";
import Navbar from "@/src/components/Navbar";
import Pagination from "@/src/components/Pagination";
import SearchBar from "@/src/components/SearchBar";
import Table, { TableColumn } from "@/src/components/Table"
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from "@/src/constants";
import { product } from "@/src/types";
import { createClient } from "@/src/utils/supabase/client";
import { useEffect, useState } from "react";

import IconFilter from "../../../public/icons/filter-button-top-table.svg"
import IconAddTop from "../../../public/icons/add-button-top-table.svg"
import Dropdown from "@/src/components/Dropdown";

const columns: TableColumn[] = [
    { label: 'id', dataKey: 'idproduct', width: '1/6', align: 'center' },
    { label: 'nama produk', dataKey: 'productname', width: '1/6', align: 'left' },
    { label: 'kategori', dataKey: 'category', width: '1/6', align: 'center' },
    { label: 'harga', dataKey: 'price', width: '1/6', align: 'center' },
    { label: 'stok', dataKey: 'stock', width: '1/6', align: 'center' },
    { label: 'aksi', dataKey: 'aksi', width: '1/6', align: 'center' },
];

export default function app() {
    const [dataItem, setDataItem] = useState<product[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
    const pageVisitedTo = pageVisited + dataPerPage;
    const[isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const toggling = () => setIsOpen(!isOpen);
    const options = ['Semua Kategori', 'Aksesoris', 'Barang Elektronik', 'Makanan dan Minuman', 'Kosmetik dan Kebersihan', 'Peralatan Rumah Tangga']
    const onOptionClicked = (value:any) => () => {
        setSelectedOption(value);
        setIsOpen(false);
    }
    useEffect (() => {
        const fetchData = async () => {
            try {
                // const cookieStore = cookies()
                // const supabase = createClient(cookieStore);
                const supabase =  createClient();
                const { data: totalCountResponse } = selectedOption === 'Semua Kategori' || selectedOption === null ? await supabase.from('product').select('count') : await supabase.from('product').select('count').eq('category', selectedOption);
                setTotalCount(totalCountResponse?.[0]?.count || 0);

                const newPageCount = Math.ceil(totalCount/dataPerPage)
                setPageCount(newPageCount);

                const { data: products, error } = selectedOption === 'Semua Kategori' || selectedOption === null ? await supabase.from('product').select().range(pageVisited, pageVisitedTo-1): await supabase.from('product').select().eq('category', selectedOption).range(pageVisited, pageVisitedTo-1);

                if (products) {
                    setDataItem(products);
                }

                // console.log('Accounts:', accounts);
                // console.log('Error:', error);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }

                 
            // if (error) {
            //   // Handle the error
              
            //   return <div>Error fetching data</div>;
            // }
        };
        fetchData();
    }, [pageVisited, pageVisitedTo, totalCount, selectedOption]);

    const displayData = dataItem.map((product) => ({
      idproduct: product.idproduct.toString() || 'N/A',
      productname: product.productname || 'N/A',
      category: product.category || 'N/A',
      price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
      stock: product.stock.toString() || 'N/A',
      aksi: <ActionButton />
    }));


      // ini nanti pindah ke tiap page
    const isAdmin = false //role === "admin"
    const isKasir = false
    const isInventaris = true

    return (
        <div>
            <Navbar 
            listOfNav={
                (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
            }
            />
            <div className='mx-16'>
                <h1 className="heading bold-28 mt-8">Daftar Produk</h1>
                <div className="mt-6 mb-12 bg-white shadow-md sm:rounded-lg">
                    <div className="grid grid-cols-2">
                        <SearchBar containerWidth="w-full"/>
                        <div className="justify-end flex flex-row pr-10 my-5 gap-4">
                            <Dropdown
                                isOpenProp={isOpen}
                                selectedOptionProp={selectedOption}
                                onToggle={toggling}
                                onOptionClicked={onOptionClicked}
                                options={options}
                            />  
                            <Button
                                type="button"
                                title="Tambah Kategori"
                                icon={IconAddTop}
                                round="rounded-lg"
                                variant="btn_blue"
                                size="semibold-14"
                            />
                            <Button
                                type="button"
                                title="Tambah Produk"
                                icon={IconAddTop}
                                round="rounded-lg"
                                variant="btn_blue"
                                size="semibold-14"
                            />
                        </div>
                    </div>
                    <Table columns={columns} data={displayData}/>
                    <div className='grid grid-cols-3 items-center'>
                        <div className='hidden lg:flex'>
                            <p className="text-sm text-gray-700 pl-8">
                                Showing <span className="font-medium">{pageVisited}</span> to <span className="font-medium">{pageVisitedTo > totalCount ? totalCount : pageVisitedTo}</span> of{' '}
                                <span className="font-medium">{totalCount}</span> results
                            </p>
                        </div>
                        <div className='col-start-2 flex justify-center'>
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
    )
}