import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../public/icons/tutup.svg';
import simpan from '../../public/icons/simpan.svg';
import edit from '../../public/icons/edit button.svg';
import Image from 'next/image';
import Button from './Button';

interface EditDataProps<T> {
    data: T;
    fields: {
      label: string;
      key: keyof T;
      readOnly?: boolean;
      options?: string[];
      valNum? : boolean;
    }[];
    onSave: (editedData: T, onDataChange: any) => void;
    onDataChange: (editedData: T) => void;
  }
  
  function EditData<T>({ data, fields, onSave, onDataChange}: EditDataProps<T>) {
    const [editedData, setEditedData] = useState<T>({ ...data });
    const [temp, setTemp] = useState<T>({ ...data });
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [isValid, setIsValid] = useState(true);
  
    useEffect(() => {
      setEditedData({ ...data });
      setTemp({...data});
    }, [data]);
  
    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();

      if(!validateInput()) {
        return;
      }

      setIsMutating(true);
  
      try {
        // Simulate asynchronous data update (replace with actual update logic)
        // const updatedData = await yourUpdateFunction(editedData);
  
        // Notify parent component about the data change
        onSave(editedData, onDataChange);
        setTemp(editedData);
        setModal(false);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setIsMutating(false);
      }
    };
  
    const handleChange = () => {
      setModal(!modal);
      setEditedData(temp);
    };
    
    const validateInput = () => {
      let isValid = true;
      for (const field of fields) {
        const value = editedData[field.key];

        // Validasi angka
        if (field.valNum && isNaN(Number(value))) {
          isValid = false;
        }
      }
      setIsValid(isValid);
      return isValid;
    };

    return (
      <div className="p-2 flex justify-center ">
        <button className="btn-neutral btn-info btn-sm space-x-4" onClick={handleChange}>
          <Image src={edit} alt="edit" />
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white">
            <div className="modal-header">
              <div className="modal-header flex justify-end">
                <button className="close-button" onClick={handleChange}>
                  <Image src={tutup} alt="edit" />
                </button>
              </div>
              <div className="flex justify-left mb-4">
                <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4 px-2">
                  Edit Data
                </h3>{' '}
              </div>
              <form onSubmit={handleSubmit} className={!isValid ? 'group-invalid' : 'group'}>
                {fields && fields.map((field) => (
                  <div key={field.key.toString()} className="form-control px-2">
                    <label className="label font-semibold text-black">{field.label}</label>
                    {field.options ? (
                      <select
                        value={String(editedData[field.key])}
                        onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                        className="input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-500"
                        disabled={field.readOnly}
                      >
                        <option value="" disabled hidden>
                          Pilih {field.label}
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <input
                          type="text"
                          value={String(editedData[field.key])}
                          readOnly={field.readOnly}
                          onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                          pattern={(field.key === 'price' || field.key === 'stock') ? '\\d+' : undefined} // Set pattern only for 'price' and 'stock'
                          placeholder={field.label}
                          className={!field.readOnly ? "input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-500 ... peer" : "input w-full input-bordered bg-gray-100 font-regular text-zinc-500 "}
  
                        />
                        {(field.key === 'price' || field.key === 'stock') && (
                          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Please enter a valid number
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div className="modal-action flex justify-center px-28">
                  {!isMutating ? (
                    <Button
                      type="submit"
                      title="Simpan"
                      round="rounded-lg"
                      variant="btn_blue"
                      size="semibold-16"
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
        </div>
      </div>
    );
  }
  
  export default EditData;