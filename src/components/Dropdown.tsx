import React, { useEffect, useState } from 'react'
import IconFilter from "../../public/icons/filter-button-top-table.svg"
import { IoFilter } from "react-icons/io5";
import Image from 'next/image'
import { createClient } from '../utils/supabase/client';

interface DropdownProps {
    isOpenProp: boolean;
    selectedOptionProp: string | null;
    onToggle: () => void;
    onOptionClicked: (id: string, name: string) => () => void;
    setCat?: React.Dispatch<React.SetStateAction<string[]>>; 
    setCatId?: React.Dispatch<React.SetStateAction<string[]>>; 
  }

const Dropdown: React.FC<DropdownProps> = ({ isOpenProp, selectedOptionProp, onToggle, onOptionClicked, setCat, setCatId}) => {  
    const [options, setOptions] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase.from('category').select('idcategory, categoryname');
            if (error) {
                throw error;
            }
            if (data) {
                // tambahin default Semua Kategori karna gaada di database
                const allCategoriesOption = { id: '0', name: 'Semua Kategori' };
                setOptions([allCategoriesOption, ...data.map((category: { idcategory: string; categoryname: string }) => ({
                    id: category.idcategory,
                    name: category.categoryname,
                }))]);
                if(setCat){
                    setCat(data.map((category: {categoryname: string }) => category.categoryname));
                }
                if(setCatId) {
                    setCatId(data.map((category: {idcategory: string }) => category.idcategory));
                }
            }

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };
        fetchCategories();
  }, []);

  return (
    <div className='inline-flex'>
        <div className='relative inline-flex rounded-lg bg-blue-500 text-white hover:bg-blue-600 items-center px-4 gap-2 border w-48'>
            <div className='h-full'>
                <button type='button' onClick={onToggle} className={`button-${isOpenProp? 'danger' : 'success'} items-center text-white hover:bg-blue-600 inline-flex h-full rounded-r-md`}>
                    <IoFilter className='inline-block cursor-pointer h-full'/>
                    {/* <Image src={IconFilter} alt="menu" className='inline-block cursor-pointer h-full'/> */}
                </button>
            </div>
            <button type="button" onClick={onToggle} className='py-2 semibold-14 cursor-pointer items-center text-center'
                style = {{ maxWidth: '115px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                 <div className="flex items-center">{selectedOptionProp || 'Semua Kategori'}</div>
            </button>
            {isOpenProp && (
                <div className='absolute top-6 right-0 z-10 mt-5 min-w-[180px] origin-top-right rounded-md border border-gray-100 bg-white shadow-lg max-h-80 overflow-auto'>
                    {options.map((option) => (
                        <button type='button' 
                        onClick={onOptionClicked(option.id, option.name)} 
                        key={option.id}
                        className='block w-full rounded-md px-4 py-1 text-sm text-gray-500 no-underline hover:bg-gray-100'>
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Dropdown