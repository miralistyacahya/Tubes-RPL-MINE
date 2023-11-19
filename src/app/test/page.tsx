import SearchBar from '@/src/components/SearchBar'
import Table from '../../components/Table'
import Pagination from '@/src/components/Pagination'

export default async function app() {
    return (
        <div className="mt-8 bg-white shadow-md sm:rounded-lg mx-16">
            <SearchBar />
            <Table />
            <Pagination />
        </div>
    )
}