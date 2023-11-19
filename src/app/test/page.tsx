import SearchBar from '@/src/components/SearchBar'
import Table from '../../components/Table'
import Pagination from '@/src/components/Pagination'

export default async function app() {
    return (
        <div className='mx-16'>
            <h1 className="heading bold-20 mt-4">Daftar Produk</h1>
            <div className="mt-4 bg-white shadow-md sm:rounded-lg">
                <SearchBar />
                <Table />
                {/* <Pagination /> */}
            </div>
        </div>
    )
}