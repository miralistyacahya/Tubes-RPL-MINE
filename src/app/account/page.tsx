"use client"
import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import ActionButton from '@/src/components/ActionButton';
import { useEffect, useState } from 'react';
import { account } from '@/src/types';
import { createClient } from '@/src/utils/supabase/client';
import TambahAkses from './tambahAkses';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();
                const { data: totalCountResponse } = await supabase.from('account').select('count');
                setTotalCount(totalCountResponse?.[0]?.count || 0);

                const newPageCount = Math.ceil(totalCount / dataPerPage);
                setPageCount(newPageCount);
                const { data: accounts, error } = await supabase.from('account').select().range(pageVisited, pageVisitedTo - 1);
                if (accounts) {
                    setDataItem(accounts);
                }
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
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

    return (
        <div className='mx-16'>
            <h1 className="heading bold-20 mt-4">Daftar Produk</h1>
            <div className="mt-4 mb-8 bg-white shadow-md sm:rounded-lg">
                <div className='flex justify-end'>
                    <TambahAkses />
                </div>
                <Table columns={columns} data={displayData} />
                <div className='grid grid-cols-3 items-center'>
                    <div className='hidden lg:flex'>
                        <p className="text-sm text-gray-700 pl-8">
                            Showing <span className="font-medium">{pageVisited}</span> to <span
                                className="font-medium">{pageVisitedTo > totalCount ? totalCount : pageVisitedTo}</span> of{' '}
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
    )
}

