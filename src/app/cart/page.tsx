import SearchBar from '@/src/components/SearchBar'
import Table, { TableColumn } from '../../components/Table'
import Pagination from '@/src/components/Pagination'
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

const columns: TableColumn[] = [
    { label: 'ID', dataKey: 'idproduct', width: '1/4', align: 'center' },
    { label: 'Nama Produk', dataKey: 'productname', width: '1/4', align: 'left' },
    { label: 'Kategori', dataKey: 'category', width: '1/4', align: 'left' },
    { label: 'Harga', dataKey: 'price', width: '1/4', align: 'center' },
];

export default async function Cart() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data: products, error } = await supabase.from('product').select();

    console.log('Products:', products);
    console.log('Error:', error);

    if (error) {
      // Handle the error
      console.error('Error fetching data:', error.message);
      return <div>Error fetching data</div>;
    }
  
    const data = products.map((product) => ({
      idproduct: product.idproduct || 'N/A',
      productname: product.productname || 'N/A',
      category: product.category || 'N/A',
      price: `Rp${product.price.toLocaleString('id-ID')},00` || 'N/A',
    }));

    return (
        <div className="flexContainer">
            {/* <div className="leftContent" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}> */}
            <div className="leftContent">
                <div style={{ marginLeft: '64px', marginRight: '32px' }}>
                    <h1 className="heading bold-20 mt-4">Daftar Produk</h1>
                    <div className="mt-4 bg-white shadow-md sm:rounded-lg">
                        <SearchBar />
                        <Table columns={columns} data={data}/>
                        {/* <Pagination /> */}
                    </div>
                </div>
            </div>
            {/* <div className="rightContent" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}> */}
            <div className="rightContent">
                <div style={{ marginRight: '64px'}}>
                    <div className="mt-16 bg-white shadow-md sm:rounded-lg" style={{ minHeight: '93vh' }}>
                        <h1 className="heading bold-20 mt-4 text-center">Keranjang</h1>
                        <div>
                            <div className="regular-16 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><i>Tidak ada barang di keranjang</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}