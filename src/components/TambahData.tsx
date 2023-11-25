import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";
import Image from "next/image";
import tutup from "../../public/icons/tutup.svg"
import simpan from "../../public/icons/simpan.svg"
import Button from "./Button";
import PopupNotification from "./PopupNotification";

interface TambahDataProps {
  tableName: string;
  formTitle: string[];
  columns: string[];
  label: string; // Menambah prop label
  icon?: string;
  colToBeValidate?: string
}

function TambahData({ tableName, formTitle, columns, label, icon, colToBeValidate }: TambahDataProps) {
  const [data, setData] = useState<Record<string, string>>({});
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [isSaved, setIsSaved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleChange = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);

    try {
      if (colToBeValidate) {
        const validationQuery = supabase.from(tableName).select(colToBeValidate).eq(colToBeValidate, data[colToBeValidate]);
    
        const { data: validationData, error: validationError } = await validationQuery;
    
        if (validationError) {
          throw validationError;
        }
    
        if (validationData && validationData.length > 0) {
          // Data exists in the database, perform your validation logic here
          setIsFailed(true);
          setTimeout(() => {
              setIsFailed(false);
          }, 3000);
          console.error('Validation failed. Data already exists in the database.');
          return;
        }
      }

      const { data: responseData, error } = await supabase
        .from(tableName)
        .upsert([data]);

      if (error) {
        throw error;
      }

      console.log(`${label} berhasil ditambahkan:`, responseData);

      // Setelah berhasil menambahkan data, reset form dan refresh halaman
      setData({});
      setIsSaved(true);
      setTimeout(() => {
          setIsSaved(false);
      }, 15000); 
      window.location.reload();
      setModal(false);
    } catch (error) {
      setIsFailed(true);
      setTimeout(() => {
          setIsFailed(false);
      }, 3000);
      console.error(`Terjadi kesalahan saat menambah ${label}:`, error);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div>
      <Button
          type="button"
          title={`Tambah ${label}`}
          icon={icon}
          round="rounded-lg"
          variant="btn_blue"
          size="semibold-14"
          onButtonClick={handleChange}
      />
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <div className="modal-header">
            <div className="modal-header flex justify-end">
              <button className="close-button " onClick={handleChange}>
                <Image src={tutup} alt="edit" />
              </button>
            </div>
            <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4 px-2">
              Tambah {label}
            </h3>
            <form onSubmit={handleSubmit}>
              {columns.map((column, index) => (
                <div key={column} className="form-control px-2">
                  <label className="label font-semibold text-black">{formTitle[index]}</label>
                  <input
                    type="text"
                    value={data[column] || ""}
                    onChange={(e) => setData({ ...data, [column]: e.target.value })}
                    className="input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-500"
                    placeholder={formTitle[index].toLowerCase() + "..."}
                  />
                </div>
              ))}
              <div className="modal-action flex justify-center px-28">
                {!isMutating ? (
                  <Button 
                    type= "submit"
                    title='Simpan'
                    round='rounded-lg'
                    variant='btn_blue'
                    size='semibold-16'
                    full={true}
                  />
                ) : (
                  <button type="button" className="btn loading">
                    Menyimpan...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        {isFailed && (
            <PopupNotification
            message={`${tableName} gagal ditambah`}
            color={"red"}
            isClicked={isFailed}
            onClicked={(onClicked) => setIsFailed(onClicked)}
          />
        )}
      </div>
        {isSaved && (
          <PopupNotification
            message={`${tableName} berhasil ditambah`}
            color={"green"}
            isClicked={isSaved}
            onClicked={(onClicked) => setIsSaved(onClicked)}
          />
        )}
    </div>
  );
}

export default TambahData;