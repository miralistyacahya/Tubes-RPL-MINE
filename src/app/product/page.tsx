"use client"

import Button from "@/src/components/Button";
import Navbar from "@/src/components/Navbar";
import Pagination from "@/src/components/Pagination";
import SearchBar from "@/src/components/SearchBar";
import Table, { TableColumn } from "@/src/components/Table"
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from "@/src/constants";
import { product } from "@/src/types";
import { createClient } from "@/src/utils/supabase/client";
import { useEffect, useState } from "react";
import IconAddTop from "../../../public/icons/add-button-top-table.svg"
import Dropdown from "@/src/components/Dropdown";

import { PostgrestError } from '@supabase/supabase-js'
import TambahData from "@/src/components/TambahData";
import TambahDataDropdown from "@/src/components/TambahDataDropdown";
import HapusData from "@/src/components/HapusData";
import EditData from "@/src/components/EditData";

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

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

    // handle dropdown filter kategori
    const[isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ id: string; name: string } | null>(null);
    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = (id: string, name: string) => () => {
        setSelectedOption({ id, name });
        setPageNumber(0);
        setIsOpen(false);
      };
      const [cat, setCat] = useState<string[]>([]);
      const [catId, setCatId] = useState<string[]>([]);
    
    // handle search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect (() => {
        const fetchData = async () => {
            try {
                // const cookieStore = cookies()
                // const supabase = createClient(cookieStore);
                const supabase =  createClient();
                
                // hitung total page buat pagination (incl. conditional kalo searching + filter)
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
                // console.log(productsWithCategories);

                // mapping buat dapetin type product yang sesuai dari hasil join
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

    const handleDelete = async (productname: string) => {
        try {
          const supabase = createClient();
          await supabase.from('product').delete().eq('productname', productname);
    
          setDataItem((prevData) => prevData.filter((product) => product.productname !== productname));
    
          setTotalCount((prevCount) => prevCount - 1);
        } catch (error: any) {
          console.error('Error deleting data:', error.message);
        }
      };

      const handleProductChange = (editedProduct: product) => {
        const updatedDataItem = dataItem.map((product) =>
            product.idproduct === editedProduct.idproduct ? { ...product, price: editedProduct.price, stock:editedProduct.stock } : product
        );
        setDataItem(updatedDataItem);
    };

      const handleSave = async (editedProduct: product, handleProductChange : any) => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
            .from('product')
            .update({
                price: editedProduct.price,
                stock: editedProduct.stock
              })
            .eq('idproduct', editedProduct.idproduct);
    
          if (error) {
            console.log(error)
            throw error;
            
          }
    
          console.log('Data berhasil diubah:', data);
    
          handleProductChange(editedProduct);
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
    }

    const displayData = dataItem.map((product) => ({
      idproduct: product.idproduct.toString() || 'N/A',
      productname: product.productname || 'N/A',
      category: product.category || 'N/A',
      price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
      stock: product.stock.toString() || 'N/A',
      aksi: (
        <div className="flex justify-center">
            <EditData
                data={product}
                fields={[
                    { label: 'ID Produk', key: 'idproduct', readOnly: true, valNum: false },
                    { label: 'Nama Produk', key: 'productname', readOnly: true, valNum: false },
                    { label: 'Kategori', key: 'category', readOnly: true, valNum: false },
                    { label: 'Harga', key: 'price', readOnly: false, valNum: true },
                    { label: 'Stok', key: 'stock', readOnly: false, valNum: true },
                ]}
                onSave={handleSave}
                onDataChange={handleProductChange}
                modalTitle="Edit Produk"
            />
            <HapusData
                data={product.productname}
                onDelete={(deletedProduct) => handleDelete(deletedProduct)}
                renderInfo={(productname) => (
                    <p style={{ fontSize: '24px', color: '#000000', wordWrap: 'break-word' }}>
                    Apakah Anda yakin ingin menghapus data product {productname}?
                    </p>
                )}
                modalTitle="Hapus Produk" // Ganti dengan judul yang sesuai
            />
        </div>
      )
    }));

    // handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPageNumber(0);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            handleSearch(event.currentTarget.value);
        }
    }

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
                        <SearchBar containerWidth="w-full" placeholder="Cari produk dengan nama..." onSearch={handleSearch} onKeyPress={handleKeyPress}/>
                        <div className="justify-end flex flex-row pr-10 my-5 gap-4">
                            <Dropdown
                                isOpenProp={isOpen}
                                selectedOptionProp={selectedOption ? selectedOption.name : null}
                                onToggle={toggling}
                                onOptionClicked={onOptionClicked}
                                setCat={setCat}
                                setCatId={setCatId}
                              /> 
                            <TambahData tableName="category" columns={["categoryname"]} formTitle= {["Nama Kategori"]} label="Kategori" icon={IconAddTop} colToBeValidate="categoryname" />
                            <TambahDataDropdown tableName="product" columns={["productname", "category", "price", "stock"]} formTitle= {["Nama Produk", "Nama Kategori", "Harga", "Stock"]} label="Produk" icon={IconAddTop} colToBeValidate="productname" dropdownCol="category" dropdownVal={cat} dropdownValId={catId}/>
                        </div>
                    </div>
                    <Table columns={columns} data={displayData}/>
                    <div className='grid grid-cols-3 items-center'>
                        <div className='hidden lg:flex'>
                            <p className="text-sm text-gray-700 pl-8"> 
                                {(!columns || !displayData || displayData.length === 0) ? 
                                `Showing 0 to 0 of 0 results`
                                : `Showing ${pageVisited + 1} to ${pageVisitedTo > totalCount ? totalCount : pageVisitedTo} of ${totalCount} results`
                                }
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