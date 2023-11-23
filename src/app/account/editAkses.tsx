// 'use client' (not a valid import statement, assuming it's a comment)
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../../public/icons/tutup.svg';
import simpan from '../../../public/icons/simpan.svg';
import edit from '../../../public/icons/edit button.svg';
import Image from 'next/image';
import EditData from '@/src/components/EditData';

interface EditAksesProps {
  account: {
    username: string;
    password: string;
    role: string;
  };
  onRoleChange: (username: string, newRole: string) => void;
}

function EditAkses({ account, onRoleChange }: EditAksesProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSave = async (editedAccount: typeof account) => {
    try {
      const { data, error } = await supabase
        .from('account')
        .update([
          {
            role: editedAccount.role,
          },
        ])
        .eq('username', editedAccount.username);

      if (error) {
        throw error;
      }

      console.log('Data berhasil diubah:', data);

      onRoleChange(editedAccount.username, editedAccount.role);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <EditData
      data={account}
      fields={[
        { label: 'Username', key: 'username', readOnly: true },
        { label: 'Password', key: 'password', readOnly: true },
        { label: 'Role', key: 'role', options: ['admin', 'inventaris', 'kasir'] },
      ]}
      onSave={handleSave}
      renderTrigger={({ openModal }) => (
        <button className="btn-neutral btn-info btn-sm" onClick={openModal}>
          <Image src={edit} alt="edit" />
        </button>
      )}
      modalTitle="Ubah Akses"
      closeIcon={<Image src={tutup} alt="edit" />}
      saveButtonIcon={<Image src={simpan} alt="edit" />}
    />
  );
}

export default EditAkses;