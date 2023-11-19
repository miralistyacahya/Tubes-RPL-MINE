const SearchBar = ({ containerWidth = 'w-2/4' }) => {
// adjust container width -> w-1/4, w-2/4 (default), w-3/4, w-4/4

  return (
    <div className="pb-4 pt-8">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="mx-8">
        <div className={`flex items-center border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-blue-500 focus-within:border-blue-500 ${containerWidth} h-8`}>
          <div className="pl-3 pr-2 pointer-events-none">
            <svg
              className="w-3 h-3 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block py-1 pl-2 pr-2 text-sm text-gray-900 w-full bg-transparent focus:outline-none focus:ring-0"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}


export default SearchBar