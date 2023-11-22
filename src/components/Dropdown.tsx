import React, { useState } from 'react'
import IconFilter from "../../public/icons/filter-button-top-table.svg"
import Image from 'next/image'

const options = ['Semua Kategori', 'Aksesoris', 'Barang Elektronik', 'Makanan dan Minuman', 'Kosmetik dan Kebersihan', 'Peralatan Rumah Tangga']

const Dropdown = () => {
    const[isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value:any) => () => {
        setSelectedOption(value);
        setIsOpen(false);
    }  
  return (
    <div className='inline-flex'>
        <div className='relative inline-flex rounded-lg bg-blue-500 text-white hover:bg-blue-600 justify-center items-center px-4 gap-2 border w-48'>
            <div className='h-full'>
                <button type='button' onClick={toggling} className={`button-${isOpen? 'danger' : 'success'} items-center justify-center text-white hover:bg-blue-600 inline-flex h-full rounded-r-md`}>
                    <Image src={IconFilter} alt="menu" className='inline-block cursor-pointer h-full'/>
                </button>
            </div>
            <button type="button" onClick={toggling} className='py-2 semibold-14 cursor-pointer justify-center w-115'
                style = {{ maxWidth: '115px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedOption || 'Semua Kategori'}
            </button>
            {isOpen && (
                <div className='absolute top-6 right-0 z-10 mt-5 min-w-[180px] origin-top-right rounded-md border border-gray-100 bg-white shadow-lg'>
                    {options.map((option) => (
                        <button type='button' 
                        onClick={onOptionClicked(option)} 
                        key={Math.random()}
                        className='block w-full rounded-md px-4 py-1 text-sm text-gray-500 no-underline hover:bg-gray-100'>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Dropdown