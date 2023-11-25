import ReactPaginate from "react-paginate"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({setPageNumber, currentPage, pageCount}:{setPageNumber: React.Dispatch<React.SetStateAction<number>>, currentPage: number, pageCount: number}) => {

    const changePage = ({selected}: {selected: number}) => {
        setPageNumber(selected);
    }

    const showNextButton = currentPage !== pageCount-1;
    const showPrevButton = currentPage !== 0;

    return (
        <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center rounded-md">
            <ChevronRightIcon className={`w-8 h-8 px-2 py-2  rounded-md ${showNextButton ? "bg-slate-100" : "bg-slate-50 text-gray-300"}`}/>
          </span>
        }
        onPageChange={changePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        forcePage={currentPage}
        pageCount={pageCount}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
            <ChevronLeftIcon className={`w-8 h-8 px-2 py-2 rounded-md ${showPrevButton ? "bg-slate-100" : "bg-slate-50 text-gray-300"}`}/>
          </span>
          
        }

        containerClassName="flex items-center py-4 mx-auto text-black"
        pageClassName="block regular-14 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md mr-4 cursor-pointer"
        activeClassName="bg-blue-600 text-white hover:bg-sky-800"
      />
    )
}

export default Pagination;