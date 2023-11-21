// 'use client' (not a valid import statement, assuming it's a comment)
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import Router from 'next/router';
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../../public/icons/tutup.svg';
import simpan from '../../../public/icons/simpan.svg';
import edit from '../../../public/icons/edit button.svg';
import hapus from '../../../public/icons/delete button.svg';
import hapusmerah from '../../../public/icons/hapusmerah.svg';
import batal from '../../../public/icons/batal.svg';
import Image from 'next/image';

interface HapusAksesProps {
  username: string;
  onDelete: (username: string) => void;
}

function HapusAkses({ username, onDelete }: HapusAksesProps) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const supabase = createClient();

  async function handleDelete(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    try {
      const { error } = await supabase
        .from('account')
        .delete()
        .eq('username', username); // Delete the specific user based on the username

      if (error) {
        throw error;
      }

      console.log('Data berhasil dihapus');
      onDelete(username); // Notify parent component about the deletion
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
              Hapus Akses
            </h3></div>
            <div className='flex justify-center pb-10' style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            <p style={{ fontSize: '24px', color: '#000000', wordWrap: 'break-word' }}>
              Apakah Anda yakin ingin menghapus data akses {username}?
            </p>
            </div>
              <p>Jika sudah dikonfirmasi, tindakan ini tidak dapat dikembalikan</p>
            <div className="modal-action flex justify-center">
            <button className="close-button" onClick={handleChange}>
                <Image src={batal} alt="hapus" />
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
    </div>
  );
}

export default HapusAkses;