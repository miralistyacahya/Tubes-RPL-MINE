import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { createClient } from '@/src/utils/supabase/client';
import tutup from '../../public/icons/tutup.svg';
import simpan from '../../public/icons/simpan.svg';
import edit from '../../public/icons/edit button.svg';
import Image from 'next/image';

interface EditDataProps<T> {
    data: T;
    fields: {
      label: string;
      key: keyof T;
      readOnly?: boolean;
      options?: string[];
    }[];
    onSave: (editedData: T) => void;
  }
  
  function EditData<T>({ data, fields, onSave }: EditDataProps<T>) {
    const [editedData, setEditedData] = useState<T>({ ...data });
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  
    useEffect(() => {
      setEditedData({ ...data });
    }, [data]);
  
    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsMutating(true);
  
      try {
        // Simulate asynchronous data update (replace with actual update logic)
        // const updatedData = await yourUpdateFunction(editedData);
  
        // Notify parent component about the data change
        onSave(editedData);
        setModal(false);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setIsMutating(false);
      }
    };
  
    const handleChange = () => {
      setModal(!modal);
    };
  
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
                <button className="close-button" onClick={handleChange}>
                  <Image src={tutup} alt="edit" />
                </button>
              </div>
              <div className="flex justify-left mb-4">
                <h3 style={{ fontSize: '28px', color: '#295F9A' }} className="font-bold text-lg mb-4">
                  Edit Data
                </h3>{' '}
              </div>
              <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div key={field.key.toString()} className="form-control">
                    <label className="label font-bold">{field.label}</label>
                    {field.options ? (
                      <select
                        value={editedData[field.key].toString()}
                        onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                        className="input w-full input-bordered"
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
                        value={editedData[field.key].toString()}
                        readOnly={field.readOnly}
                        onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                        className="input w-full input-bordered bg-gray-300"
                        placeholder={field.label}
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
  }
  
  export default EditData;