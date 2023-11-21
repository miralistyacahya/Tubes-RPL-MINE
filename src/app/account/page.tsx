"use client"
import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import { cookies } from 'next/headers';
import ActionButton from '@/src/components/ActionButton';
import { useEffect, useState } from 'react';
import { account } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import TambahAkses from './tambahAkses';
import EditAkses from './editAkses';

const columns: TableColumn[] = [
    { label: 'username', dataKey: 'username', width: '1/4', align: 'left' },
    { label: 'password', dataKey: 'password', width: '1/4', align: 'left' },
    { label: 'role', dataKey: 'role', width: '1/4', align: 'center' },
    { label: 'aksi', dataKey: 'aksi', width: '1/4', align: 'center' },
];

export default function app() {
    const [dataItem, setDataItem] = useState<account[]>([]);
    
    useEffect (() => {
        const fetchData = async () => {
            try {
                // const cookieStore = cookies()
                // const supabase = createClient(cookieStore);
                const supabase =  createClient();
                // const user = supabase.auth.getUser();

                // console.log(user);

                const { data: accounts, error } = await supabase.from('account').select();
            
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
    }, []);
    
    const [pageNumber, setPageNumber] = useState(0);

    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;

    const displayData = dataItem.slice(pageVisited, pageVisited + dataPerPage).map((account) => ({
        username: account.username || 'N/A',
        password: account.password || 'N/A',
        role: account.role || 'N/A',
        aksi: <EditAkses account={account} />,
      }));

    const pageCount = Math.ceil(dataItem.length/dataPerPage);

    return (
        <div className='mx-16'>
            <h1 className="heading bold-20 mt-4">Daftar Produk</h1>
            <div className="mt-4 mb-8 bg-white shadow-md sm:rounded-lg">
              <div className='flex justify-end'>
                <TambahAkses /> </div>
                <Table columns={columns} data={displayData}/>
                <div className='grid grid-cols-3 items-center'>
                    <div className='hidden lg:flex'>
                        <p className="text-sm text-gray-700 pl-8">
                            Showing <span className="font-medium">{pageVisited}</span> to <span className="font-medium">{pageVisited + dataPerPage}</span> of{' '}
                            <span className="font-medium">{dataItem.length}</span> results
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
    )
}