import React, { useState } from 'react'
import IconFilter from "../../public/icons/filter-button-top-table.svg"
import Image from 'next/image'

interface DropdownProps {
    isOpenProp: boolean;
    selectedOptionProp: string | null;
    onToggle: () => void;
    onOptionClicked: (value: string) => () => void;
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ isOpenProp, selectedOptionProp, onToggle, onOptionClicked, options }) => {  
  return (
    <div className='inline-flex'>
        <div className='relative inline-flex rounded-lg bg-blue-500 text-white hover:bg-blue-600 items-center px-4 gap-2 border w-48'>
            <div className='h-full'>
                <button type='button' onClick={onToggle} className={`button-${isOpenProp? 'danger' : 'success'} items-center text-white hover:bg-blue-600 inline-flex h-full rounded-r-md`}>
                    <Image src={IconFilter} alt="menu" className='inline-block cursor-pointer h-full'/>
                </button>
            </div>
            <button type="button" onClick={onToggle} className='py-2 semibold-14 cursor-pointer items-center text-center'
                style = {{ maxWidth: '115px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                 <div className="flex items-center">{selectedOptionProp || 'Semua Kategori'}</div>
            </button>
            {isOpenProp && (
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