import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";
import Image from "next/image";
import tutup from "../../public/icons/tutup.svg"
import simpan from "../../public/icons/simpan.svg"
import Button from "./Button";
import PopupNotification from "./PopupNotification";

interface TambahDataDropdownProps {
  tableName: string;
  formTitle: string[];
  columns: string[];
  label: string; // Menambah prop label
  icon?: string;
  colToBeValidate?: string;
  dropdownCol?: string;
  dropdownVal?: string[];
  dropdownValId?: string[];
}

// ... (other imports)

function TambahDataDropdown({tableName, formTitle, columns, label, icon, colToBeValidate, dropdownCol, dropdownVal, dropdownValId }: TambahDataDropdownProps) {
    const [data, setData] = useState<Record<string, string>>({});
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const [isValid, setIsValid] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const handleChange = () => {
      setModal(!modal);
    };
  
    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();

      if(!validateInput()) {
        return;
      }

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
            console.error('Validation failed. Data already exists in the database.');
            setIsFailed(true);
            setTimeout(() => {
                setIsFailed(false);
            }, 3000);
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
        setData({});
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 15000);
        setModal(false);
        window.location.reload()
      } catch (error) {
        console.error(`Terjadi kesalahan saat menambah ${label}:`, error);
        setIsFailed(true);
        setTimeout(() => {
            setIsFailed(false);
        }, 3000);
      } finally {
        setIsMutating(false);
      }
    };
  
    const validateInput = () => {
      let isValid = true;
    
      for (const column of columns) {
        const value = data[column];
    
        // Validasi angka untuk kolom 'price' atau 'stock'
        if ((column === 'price' || column === 'stock') && isNaN(Number(value))) {
          isValid = false;
        }
      }
    
      setIsValid(isValid);
      return isValid;
    };

    return (
      <div>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChange}>
          + Tambah {label}
        </button> */}
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
        <div className={`modal ${modal ? 'open' : ''}`}>
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
              <form onSubmit={handleSubmit} className={!isValid ? 'group-invalid' : 'group'}>
                {columns.map((column, index) => (
                  <div key={column} className="form-control px-2">
                    <label className="label font-semibold text-black">{formTitle[index]}</label>
                    {column === dropdownCol ? (
                      <select
                        value={data[column] || ""}
                        onChange={(e) => setData({ ...data, [column]: e.target.value })}
                        className="input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-400"
                      >
                        <option value="" disabled hidden>
                          Pilih {formTitle[index]}
                        </option>
                        {dropdownVal?.map((option, index) => (
                          <option key={option} value={tableName === 'product' ? dropdownValId?.[index] : option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <input
                          type="text"
                          value={data[column] || ""}
                          onChange={(e) => setData({ ...data, [column]: e.target.value })}
                          pattern={(column === 'price' || column === 'stock') ? '\\d+' : undefined} // Set pattern only for 'price' and 'stock'
                          placeholder={formTitle[index].toLowerCase() + "..."}
                          className="input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-500 ... peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        />
                        {(column === 'price' || column === 'stock') && (
                          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Harap masukkan angka yang valid
                          </span>
                        )}
                      </div>
                    )}
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
                      addDetail={!isValid ? 'group-invalid:pointer-events-none group-invalid:opacity-30' : ''}
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
  
  export default TambahDataDropdown;
  