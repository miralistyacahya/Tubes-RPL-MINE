import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../public/icons/tutup.svg';
import simpan from '../../public/icons/simpan.svg';
import edit from '../../public/icons/edit button.svg';
import hapus from '../../public/icons/delete button.svg';
import hapusmerah from '../../public/icons/hapusmerah.svg';
import batal from '../../public/icons/batal.svg';
import Image from 'next/image';
import Button from './Button';

interface HapusDataProps<T> {
    data: T;
    onDelete: (data: T) => void;
    renderInfo: (data: T) => React.ReactNode;
    modalTitle: string;
  }
  
  function HapusData<T>({ data, onDelete, renderInfo, modalTitle }: HapusDataProps<T>) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  
    async function handleDelete(e: SyntheticEvent) {
      e.preventDefault();
      setIsMutating(true);
  
      try {
        // Perform delete operation based on your data structure
        // For example, you can use Supabase or any other service
        // Replace the following line with your actual delete logic
        // const { error } = await supabase.from('your_table').delete().eq('id', data.id);
  
        // Simulating a successful deletion
        const error = null;
  
        if (error) {
          throw error;
        }
  
        console.log('Data berhasil dihapus');
        onDelete(data); // Notify parent component about the deletion
        setModal(false);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setIsMutating(false);
      }
    }
  
    function handleChange() {
      setModal(!modal);
    }
  
    return (
      <div className="p-2 flex justify-center">
        <button className="btn-neutral btn-error btn-sm space-x-4" onClick={handleChange}>
          <Image src={hapus} alt="hapus" />
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        {modal && (
          <div className="modal">
            <div className="modal-box bg-white">
              <div className="modal-header">
                <div className="modal-header flex justify-end">
                  <button className="close-button" onClick={handleChange}>
                    <Image src={tutup} alt="hapus" />
                  </button>
                </div>
                <div className='flex justify-left mb-4 pb-10'>
                  <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4 px-2">
                    {modalTitle}
                  </h3>
                </div>
                <div className='flex justify-center pb-10 px-2 font-semibold' style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {renderInfo(data)}
                </div>
                <div className='px-4 flex justify-center items-center'>
                  <p>Jika sudah dikonfirmasi, tindakan ini tidak dapat dikembalikan</p>
                </div>
                <div className="grid grid-cols-2 modal-action justify-center items-center px-8 gap-4 mb-4">
                  <button type="button" className="close-button rounded-lg border btn_cancel justify-center items-center py-4" onClick={handleChange}>
                    {/* <Image src={batal} alt="batal" /> */}
                    <label className={`semibold-16 whitespace-nowrap cursor-pointer`}>Batal</label>
                  </button>
                  {!isMutating ? (
                    <button type="button" className="btn-danger rounded-lg border btn_red justify-center items-center py-4" onClick={handleDelete}>
                      {/* <Image src={hapusmerah} alt="hapus" /> */}
                      <label className={`semibold-16 whitespace-nowrap cursor-pointer`}>Hapus</label>
                    </button>
                  ) : (
                    <button type="button" className="btn loading">
                      Menghapus...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default HapusData;