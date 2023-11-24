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
    }[];
    onSave: (editedData: T, onDataChange: any) => void;
    onDataChange: (editedData: T) => void;
  }
  
  function EditData<T>({ data, fields, onSave, onDataChange}: EditDataProps<T>) {
    const [editedData, setEditedData] = useState<T>({ ...data });
    const [temp, setTemp] = useState<T>({ ...data });
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  
    useEffect(() => {
      setEditedData({ ...data });
      setTemp({...data});
    }, [data]);
  
    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
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
              <form onSubmit={handleSubmit}>
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
                      <input
                        type="text"
                        value={String(editedData[field.key])}
                        readOnly={field.readOnly}
                        onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                        className={!field.readOnly ? "input w-full focus:ring-2 ring-blue-500 input-bordered bg-white font-regular text-zinc-500" : "input w-full input-bordered bg-gray-100 font-regular text-zinc-500"}
                        placeholder={field.label}
                      />
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