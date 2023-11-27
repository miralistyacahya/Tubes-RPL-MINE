"use client"

import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import { useEffect, useState } from 'react';
import { account } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import Navbar from '@/src/components/Navbar';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';
import TambahDataDropdown from '@/src/components/TambahDataDropdown';
import IconAddTop from "../../../public/icons/add-button-top-table.svg";
import EditData from '@/src/components/EditData';
import HapusData from '@/src/components/HapusData';
import TambahAkses from './TambahAkses';

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
    
    const handleRoleChange = (editedAccount: account) => {
        // Find the account in dataItem and update its role
        const updatedDataItem = dataItem.map((account) =>
            account.username === editedAccount.username ? { ...account, role: editedAccount.role } : account
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

      const handleSave = async (editedAccount: account, handleRoleChange : any) => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
            .from('account')
            .update({
                role: editedAccount.role
              })
            .eq('username', editedAccount.username);
    
          if (error) {
            console.log(error)
            throw error;
            
          }
    
          console.log('Data berhasil diubah:', data);
    
          handleRoleChange(editedAccount);
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
    }


    const displayData = dataItem.map((account) => ({
      username: account.username || 'N/A',
      password: account.password || 'N/A',
      role: account.role || 'N/A',
      aksi: (
        <div className="flex justify-center">
            <EditData
                data={account}
                fields={[
                    { label: 'Username', key: 'username', readOnly: true, valNum: false },
                    { label: 'Password', key: 'password', readOnly: true, valNum: false },
                    { label: 'Role', key: 'role', readOnly: false, options: ['admin', 'inventaris', 'kasir'], valNum: false },

                ]}
                onSave={handleSave}
                onDataChange={handleRoleChange}
                modalTitle="Ubah Akses"
            />

            <HapusData
                data={account.username}
                onDelete={(deletedProduct) => handleDelete(deletedProduct)}
                renderInfo={(productname) => (
                    <p style={{ fontSize: '24px', color: '#000000', wordWrap: 'break-word' }}>
                    Apakah Anda yakin ingin menghapus data akses {productname}?
                    </p>
                )}
                modalTitle="Hapus Akses" // Ganti dengan judul yang sesuai
            />

        </div>
    ),
}));



    const isAdmin = true //role === "admin"
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
                <h1 className="heading bold-28 mt-8">Daftar Akun</h1>
                <div className="mt-6 mb-12 bg-white shadow-md sm:rounded-lg">
                    <div className="grid grid-cols-2">
                        <div className="justify-end flex flex-row pr-10 my-5 gap-4 col-start-2">
                            <TambahAkses/>
                        </div>
                    </div>
                    <Table columns={columns} data={displayData} message='Tidak ada akun'/>
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
