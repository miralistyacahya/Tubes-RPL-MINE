// 'use client' (not a valid import statement, assuming it's a comment)
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../../public/icons/tutup.svg';
import simpan from '../../../public/icons/simpan.svg';
import edit from '../../../public/icons/edit button.svg';
import Image from 'next/image';

interface EditAksesProps {
  account: {
    username: string;
    password: string;
    role: string;
  };
  onRoleChange: (username: string, newRole: string) => void; // New prop for handling role change
}

function EditAkses({ account, onRoleChange }: EditAksesProps) {
  const [role, setRole] = useState(account.role);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setRole(account.role);
  }, [account]); // Update role when account changes

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    try {
      const { data, error } = await supabase
        .from('account')
        .update([
          {
            role,
          },
        ])
        .eq('username', account.username); // Update the specific user based on the username

      if (error) {
        throw error;
      }

      console.log('Data berhasil diubah:', data);

      onRoleChange(account.username, role); // Notify parent component about the role change
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
      <button className="btn-neutral btn-info btn-sm" onClick={handleChange}>
        <Image src={edit} alt="edit" />
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <div className="modal-header flex justify-end">
              <button className="close-button " onClick={handleChange}>
                <Image src={tutup} alt="edit" />
              </button>
            </div>
            <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4">
              Ubah Akses
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-bold">Username</label>
                <input type="text" value={account.username} readOnly className="input w-full input-bordered bg-gray-300" placeholder="Username" />
              </div>
              <div className="form-control">
                <label className="label font-bold">Password</label>
                <input type="text" value={account.password} readOnly className="input w-full input-bordered bg-gray-300" placeholder="Password" />
              </div>
              <div className="form-control">
                <label className="label font-bold">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input w-full input-bordered">
                  <option value="" disabled hidden>
                    Pilih Role
                  </option>
                  <option value="admin">admin</option>
                  <option value="inventaris">inventaris</option>
                  <option value="kasir">kasir</option>
                </select>
              </div>
              <div className="modal-action flex justify-center">
                {!isMutating ? (
                  <button type="submit" className="btn-primary">
                    <Image src={simpan} alt="edit" />
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    Menyimpan...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAkses;
