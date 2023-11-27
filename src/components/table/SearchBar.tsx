import Image from "next/image";
import searchButton from "../../public/icons/search button.svg"
import React, { useState } from "react";

interface SearchBarProps {
  containerWidth: string;
  placeholder: string;
  onSearch:(query:string) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ containerWidth, placeholder, onSearch, onKeyPress}) => {
// adjust container width -> w-1/4, w-2/4 (default), w-3/4, w-4/4
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="py-6">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="mx-8">
        <div className={`flex items-center border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-blue-500 focus-within:border-blue-500 ${containerWidth} h-8`}>
          <div className="pl-3 pr-2 pointer-events-none">
            <Image src={searchButton} alt="search"/>
          </div>
          <input
            type="text"
            id="table-search"
            className="block py-1 pl-2 pr-2 text-sm text-gray-900 w-full bg-transparent focus:outline-none focus:ring-0"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={onKeyPress}
          />
        </div>
      </div>
    </div>
  );
}


export default SearchBar