import React from 'react'
import IconFilter from "../../../public/icons/filter-button-top-table.svg"

const Dropdown = () => {
  return (
    <div className='inline-flex'>
        <div className='relative inline-flex rounded-lg bg-blue-500 text-white hover:bg-blue-600 justify-center items-center'>
            <div className='px-4 py-2 semibold-14'>
                Semua Kategori
            </div>
            <div className='relative'>
                <button type='button' className=' border-1 inline-flex h-full items-center justify-center px-2 text-white hover:bg-blue-600'>
                    <Image src={IconFilter} alt="menu" width={24} height={24} className='inline-block cursor-pointer md:hidden'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Dropdown