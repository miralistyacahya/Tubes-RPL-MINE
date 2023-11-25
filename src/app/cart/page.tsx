"use client"

import { useEffect, useState } from 'react';
import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '@/src/components/Table'
import Pagination from '@/src/components/Pagination'
import Navbar from '@/src/components/Navbar';
import Dropdown from "@/src/components/Dropdown";
import AddedButton from '@/src/components/cart/AddButton';
import CartPage from '@/src/components/cart/CartPage';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';
import { product } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js'

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

const columns: TableColumn[] = [
    { label: 'ID', dataKey: 'idproduct', width: '1/4', align: 'center' },
    { label: 'Nama Produk', dataKey: 'productname', width: '1/4', align: 'left' },
    { label: 'Kategori', dataKey: 'category', width: '1/4', align: 'left' },
    { label: 'Harga', dataKey: 'price', width: '1/4', align: 'center' },
    { label: '', dataKey: 'aksi', width: '1/4', align: 'center' },
];

Intl.DateTimeFormat().resolvedOptions().timeZone = 'Asia/Jakarta';

export default function Cart() {
    const [dataItem, setDataItem] = useState<product[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
    const pageVisitedTo = pageVisited + dataPerPage;

    // handle filter
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ id: string; name: string } | null>(null);
    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = (id: string, name: string) => () => {
        setSelectedOption({ id, name });
        setPageNumber(0);
        setIsOpen(false);
    };

    // handle search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect (() => {
        const fetchData = async () => {
            try {
                const supabase =  createClient();
                
                // count total page pagination (incl. conditional searching + filter)
                let totalCountQuery;
                if (searchQuery && (selectedOption?.name === 'Semua Kategori' || selectedOption === null)) {
                    totalCountQuery = supabase.from('product').select('count').ilike('productname', `%${searchQuery}%`);
                } else if (searchQuery) {
                    totalCountQuery = supabase.from('product').select('count').eq('category', selectedOption?.id).ilike('productname', `%${searchQuery}%`);
                } else if(selectedOption?.name === 'Semua Kategori' || selectedOption === null) {
                    totalCountQuery = supabase.from('product').select('count');
                } else {
                    totalCountQuery = supabase.from('product').select('count').eq('category', selectedOption.id);
                }

                const { data: totalCountResponse } = await totalCountQuery;
                setTotalCount(totalCountResponse?.[0]?.count || 0);

                const newPageCount = Math.ceil(totalCount/dataPerPage)
                setPageCount(newPageCount);

                // fetch data produk berdasarkan conditional (ada search/filter/default biasa + sesuai pagination)
                let productsQuery;
                if (searchQuery && (selectedOption?.name === 'Semua Kategori' || selectedOption === null)) {
                    productsQuery = supabase.from('product').select('idproduct, productname, category(categoryname), price, stock').ilike('productname', `%${searchQuery}%`).range(pageVisited, pageVisitedTo - 1);
                } else if (searchQuery) {
                    productsQuery = supabase.from('product').select('idproduct, productname, category(categoryname), price, stock').eq('category', selectedOption?.id).ilike('productname', `%${searchQuery}%`).range(pageVisited, pageVisitedTo - 1);
                } else if(selectedOption?.name === 'Semua Kategori' || selectedOption === null) {
                    productsQuery = supabase.from('product').select('idproduct, productname, category(categoryname), price, stock').range(pageVisited, pageVisitedTo - 1);
                } else {    
                    productsQuery = supabase.from('product').select('idproduct, productname, category(categoryname), price, stock').eq('category', selectedOption.id).range(pageVisited, pageVisitedTo - 1);
                }

                // handle join tables
                type ProductsWithCategories = DbResultOk<typeof productsQuery>
                const { data: products, error } = await productsQuery;
                if (error) throw error
                const productsWithCategories: ProductsWithCategories = products

                // search type product
                const transformedData = productsWithCategories?.map(item => ({
                    idproduct: item.idproduct,
                    productname: item.productname,
                    category:
                      (Array.isArray(item.category) && item.category.length > 0
                        ? (item.category[0] as unknown as { categoryname: any }).categoryname
                        : typeof item.category === 'object' && item.category !== null
                        ? (item.category as unknown as { categoryname: any }).categoryname
                        : '') || '',
                    price: item.price,
                    stock: item.stock,
                }));
                  
                if (transformedData) {
                    setDataItem(transformedData);
                }

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }

        };

        fetchData();

    }, [pageVisited, pageVisitedTo, totalCount, selectedOption, searchQuery]);

    const displayData = dataItem.map((product) => ({
        idproduct: product.idproduct || 'N/A',
        productname: product.productname || 'N/A',
        category: product.category || 'N/A',
        price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
        aksi: <AddedButton onButtonClick={() => handleButtonPlusClick([product.idproduct, product.productname, product.price])} />,
    }));

    // handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            handleSearch(event.currentTarget.value);
        }
    }

    // handle cart
    const [cart, setCart] = useState<(string | number)[][]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [isInitialCart, setIsInitialCart] = useState(true);
    const [isFailed, setIsFailed] = useState(false);

    useEffect(() => {
        if (isFailed) {
            setTimeout(() => {
                setIsFailed(false);
            }, 2000);
        }
    }, [isFailed]);

    const handleButtonPlusClick = (productCart: (string | number)[]) => {
        // Add the product to the cart by 1
        // id product, name, price, qty
        const prevTotal = [cartTotal]
        const prevCart = [...cart]

        const existingProduct = prevCart.findIndex((item) => item[0] == productCart[0]);
        if (existingProduct != -1) {
            const total = Number(prevTotal) + Number(prevCart[existingProduct][2]);
            prevCart[existingProduct][3] = Number(prevCart[existingProduct][3]) + 1
            setCartTotal(total);
        } else {
            const total = Number(prevTotal) + Number(productCart[2]);
            prevCart.push([...productCart, 1]);
            setCartTotal(total);
        }

        setCart(prevCart);
        setIsInitialCart(false);
    }; 

    const handleButtonMinClick = (productCart: (string | number)[]) => {
        // Reduce the product from the cart by 1
        // id product, name, price, qty
        const prevTotal = [cartTotal]
        const prevCart = [...cart]
        
        const existingProduct = prevCart.findIndex((item) => item[0] == productCart[0]);
        const total = Number(prevTotal) - Number(prevCart[existingProduct][2]);
        const currentQty = Number(prevCart[existingProduct][3]) - 1
        if (currentQty > 0){
            prevCart[existingProduct][3] = currentQty;
        } else {
            prevCart.splice(existingProduct, 1);
        }
        setCartTotal(total);
        setCart(prevCart);
    };

    const handleButtonDelClick = (productCart: (string | number)[]) => {
        const prevTotal = [cartTotal]
        const prevCart = [...cart]
        const existingProduct = prevCart.findIndex((item) => item[0] == productCart[0]);
        const total = Number(prevTotal) - (Number(prevCart[existingProduct][2]) * Number(prevCart[existingProduct][3]));
        prevCart.splice(existingProduct, 1);
        setCartTotal(total);
        setCart(prevCart);
    };

    const handleButtonFailedClick = () => {
        setCart([]);
        setCartTotal(0);
        setIsFailed(true);
    };

    const currentDate: Date = new Date();
    const user: string = "Kasir 1";

    const isAdmin = false;
    const isInventaris = false;
    const isKasir = true;

    return (
        <div>
            <Navbar 
                listOfNav={
                    (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
                }
            />
            <div className="flexContainer">
                <div className="leftContent">
                    <div style={{ marginLeft: '64px', marginRight: '32px' }}>
                        <h1 className="heading bold-28 mt-4">Daftar Produk</h1>
                        <div className="mt-6 mb-12 bg-white shadow-md sm:rounded-lg">
                            <div className="grid grid-cols-2">
                            <SearchBar containerWidth="w-full" placeholder="Cari produk dengan nama..." onSearch={handleSearch} onKeyPress={handleKeyPress}/>
                                <div className="flex justify-end items-center pr-8 my-4">
                                    <Dropdown
                                        isOpenProp={isOpen}
                                        selectedOptionProp={selectedOption ? selectedOption.name : null}
                                        onToggle={toggling}
                                        onOptionClicked={onOptionClicked}
                                    /> 
                                </div>
                            </div>
                            <Table columns={columns} data={displayData}/>
                            <div className='grid grid-cols-2 items-center'>
                                <div className='hidden lg:flex'>
                                    <p className="text-sm text-gray-700 pl-8"> 
                                        {(!columns || !displayData || displayData.length === 0) ? 
                                        `Showing 0 to 0 of 0 results`
                                        : `Showing ${pageVisited + 1} to ${pageVisitedTo > totalCount ? totalCount : pageVisitedTo} of ${totalCount} results`
                                        }
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
                    <div className="pb-12" style={{ marginRight: '64px'}}>
                        <CartPage user = { user } currentDate = { currentDate } cart = { cart } cartTotal = { cartTotal } isInitialCart = { isInitialCart } isFailed = { isFailed } handleButtonPlusClick = { handleButtonPlusClick } handleButtonMinClick = { handleButtonMinClick } handleButtonDelClick={ handleButtonDelClick } handleButtonFailedClick={ handleButtonFailedClick }/>
                    </div>
                </div>
            </div>
        </div>
    )
}