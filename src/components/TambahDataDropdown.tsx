import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";
import Image from "next/image";
import tutup from "../../public/icons/tutup.svg"
import simpan from "../../public/icons/simpan.svg"

interface TambahDataDropdownProps {
  tableName: string;
  columns: string[];
  label: string; // Menambah prop label
}

function TambahDataDropdown({ tableName, columns, label }: TambahDataDropdownProps) {
  const [data, setData] = useState<Record<string, string>>({});
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);

    try {
      const { data: responseData, error } = await supabase
        .from(tableName)
        .upsert([data]);

      if (error) {
        throw error;
      }

      console.log(`${label} berhasil ditambahkan:`, responseData);

      // Setelah berhasil menambahkan data, reset form dan refresh halaman
      setData({});
      window.location.reload();
      setModal(false);
    } catch (error) {
      console.error(`Terjadi kesalahan saat menambah ${label}:`, error);
    } finally {
      setIsMutating(false);
    }
  };

return (
    <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChange}>
        + Tambah {label}
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            {/* ... */}
            <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4">
              Tambah {label}
            </h3>
            <form onSubmit={handleSubmit}>
              {columns.map((column) => (
                <div key={column} className="form-control">
                  <label className="label font-bold">{column === "role" ? "Role" : column}</label>
                  {column === "role" ? (
                    <select
                      value={data[column] || ""}
                      onChange={(e) => setData({ ...data, [column]: e.target.value })}
                      className="input w-full input-bordered"
                    >
                      <option value="" disabled hidden>
                        Pilih Role
                      </option>
                      <option value="admin">admin</option>
                      <option value="inventaris">inventaris</option>
                      <option value="kasir">kasir</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={data[column] || ""}
                      onChange={(e) => setData({ ...data, [column]: e.target.value })}
                      className="input w-full input-bordered"
                      placeholder={column}
                    />
                  )}
                </div>
              ))}
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
};

export default TambahDataDropdown;