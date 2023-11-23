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
import HapusData from '@/src/components/HapusData';

interface HapusAksesProps {
  username: string;
  onDelete: (username: string) => void;
}

function HapusAkses({ username, onDelete }: HapusAksesProps) {
  return (
    <HapusData
      data={username}
      onDelete={onDelete}
      renderInfo={(username) => (
        <>
          <p style={{ fontSize: '24px', color: '#000000', wordWrap: 'break-word' }}>
            Apakah Anda yakin ingin menghapus data akses {username}?
          </p>
        </>
      )}
      modalTitle="Hapus Akses" // Ganti dengan judul yang sesuai
    />
  );
}

export default HapusAkses;