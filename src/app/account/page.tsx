"use client"

import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import { cookies } from 'next/headers';
import ActionButton from '@/src/components/ActionButton';
import { useEffect, useState } from 'react';
import { account } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import Navbar from '@/src/components/Navbar';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';
import TambahAkses from './tambahAkses';
import TambahData from '@/src/components/TambahData';
import TambahDataDropdown from '@/src/components/TambahDataDropdown';
import IconAddTop from "../../../public/icons/add-button-top-table.svg";
import EditAkses from './editAkses';
import HapusAkses from './hapusAkses';

const columns: TableColumn[] = [
    { label: 'username', dataKey: 'username', width: '1/4', align: 'left' },
    { label: 'password', dataKey: 'password', width: '1/4', align: 'left' },
    { label: 'role', dataKey: 'role', width: '1/4', align: 'center' },
    { label: 'aksi', dataKey: 'aksi', width: '1/4', align: 'center' },
];

export default function app() {
    const [dataItem, setDataItem] = useState<account[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
    const pageVisitedTo = pageVisited + dataPerPage;

    useEffect (() => {
        const fetchData = async () => {
            try {
                // const cookieStore = cookies()
                // const supabase = createClient(cookieStore);
                const supabase =  createClient();
                const { data: totalCountResponse} = await supabase.from('account').select('count');
                setTotalCount(totalCountResponse?.[0]?.count || 0);
        
                console.log(totalCount);

                const newPageCount = Math.ceil(totalCount/dataPerPage)
                setPageCount(newPageCount);

                const { data: accounts, error } = await supabase.from('account').select().range(pageVisited, pageVisitedTo-1);

                if (accounts) {
                    setDataItem(accounts);
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
    }, [pageVisited, pageVisitedTo, totalCount]);
    
    const handleRoleChange = (username: string, newRole: string) => {
        // Find the account in dataItem and update its role
        const updatedDataItem = dataItem.map((account) =>
            account.username === username ? { ...account, role: newRole } : account
        );
        setDataItem(updatedDataItem);
    };

    const handleDelete = async (username: string) => {
        try {
          const supabase = createClient();
          await supabase.from('account').delete().eq('username', username);
    
          // Set state to reflect the updated data without the deleted user
          setDataItem((prevData) => prevData.filter((account) => account.username !== username));
    
          setTotalCount((prevCount) => prevCount - 1); // Update total count after deletion
        } catch (error: any) {
          console.error('Error deleting data:', error.message);
        }
      };


    const displayData = dataItem.map((account) => ({
      username: account.username || 'N/A',
      password: account.password || 'N/A',
      role: account.role || 'N/A',
      aksi: (
        <div className="flex justify-center">
            <EditAkses account={account} onRoleChange={handleRoleChange} />
            <HapusAkses username={account.username} onDelete={(deletedUsername) => handleDelete(deletedUsername)} />
        </div>
    ),
}));



    const isAdmin = false //role === "admin"
    const isKasir = false
    const isInventaris = false

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
                        <div className="justify-end flex flex-row pr-10 my-5 gap-4 col-start-2">
                            <TambahDataDropdown tableName="account" columns={["username", "password", "role"]} formTitle= {["Username", "Password", "Role"]} label="Akses" icon={IconAddTop} colToBeValidate="username" dropdownCol="role" dropdownVal={["Admin", "Kasir", "Inventaris"]}/>
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
