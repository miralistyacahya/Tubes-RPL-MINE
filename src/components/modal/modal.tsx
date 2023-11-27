// Modal.tsx
import { SyntheticEvent, useState } from "react";
import { createClient } from "@/src/utils/supabase/client";
import Image from "next/image";
import tutup from "../../../public/icons/tutup.svg"
import simpan from "../../../public/icons/simpan.svg"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    try {
      const { data, error } = await supabase
        .from("account")
        .upsert([
          {
            username,
            password,
            role,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data berhasil ditambahkan:", data);

      setUsername("");
      setPassword("");
      setRole("");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-header flex justify-end">
                <button className="close-button" onClick={onClose}>
                  <Image src={tutup} alt="edit" />
                </button>
              </div>
              <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4">Tambah Akses</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label font-bold">Username</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input w-full input-bordered" placeholder="Username" />
                </div>
                <div className="form-control">
                  <label className="label font-bold">Password</label>
                  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full input-bordered" placeholder="Password" />
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
                    <button type="submit" className="btn-primary"><Image src={simpan} alt="edit" /></button>
                  ) : (
                    <button type="button" className="btn loading">Menyimpan...</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

