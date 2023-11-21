// TambahAkses.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";
import Modal from "@/src/components/modal";
import tutup from "../../../public/icons/tutup.svg";
import simpan from "../../../public/icons/simpan.svg";
import Image from "next/image";

function TambahAkses() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div className="mb-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChange}>+ Tambah Akses</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <Modal isOpen={modal} onClose={handleChange} />
    </div>
  );
}

export default TambahAkses;
