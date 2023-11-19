import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';
import ActionButton from '@/src/components/ActionButton';

const columns: TableColumn[] = [
    { label: 'username', dataKey: 'username', width: '1/4', align: 'left' },
    { label: 'password', dataKey: 'password', width: '1/4', align: 'left' },
    { label: 'role', dataKey: 'role', width: '1/4', align: 'center' },
    { label: 'aksi', dataKey: 'aksi', width: '1/4', align: 'center' },
];

export default async function app() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data: accounts, error } = await supabase.from('account').select();

    console.log('Accounts:', accounts);
    console.log('Error:', error);

    if (error) {
      // Handle the error
      console.error('Error fetching data:', error.message);
      return <div>Error fetching data</div>;
    }
  
    const data = accounts.map((account) => ({
      username: account.username || 'N/A',
      password: account.password || 'N/A',
      role: account.role || 'N/A',
      aksi: <ActionButton />
    }));

    return (
        <div className='mx-16'>
            <h1 className="heading bold-20 mt-4">Daftar Produk</h1>
            <div className="mt-4 bg-white shadow-md sm:rounded-lg">
                <SearchBar />
                <Table columns={columns} data={data}/>
                {/* <Pagination /> */}
            </div>
        </div>
    )
}