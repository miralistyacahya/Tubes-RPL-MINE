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
      <div className="p-2 flex justify-center space-x-4">
        <button className="btn-neutral btn-danger btn-sm" onClick={handleChange}>
          <Image src={hapus} alt="hapus" />
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        {modal && (
          <div className="modal">
            <div className="modal-box">
              <div className="modal-header">
                <div className="modal-header flex justify-end">
                  <button className="close-button" onClick={handleChange}>
                    <Image src={tutup} alt="hapus" />
                  </button>
                </div>
                <div className='flex justify-left mb-4 pb-10'>
                  <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4">
                    {modalTitle}
                  </h3>
                </div>
                <div className='flex justify-center pb-10' style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {renderInfo(data)}
                </div>
                <p>Jika sudah dikonfirmasi, tindakan ini tidak dapat dikembalikan</p>
                <div className="modal-action flex justify-center">
                  <button className="close-button" onClick={handleChange}>
                    <Image src={batal} alt="batal" />
                  </button>
                  {!isMutating ? (
                    <button type="button" className="btn-danger" onClick={handleDelete}>
                      <Image src={hapusmerah} alt="hapus" />
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