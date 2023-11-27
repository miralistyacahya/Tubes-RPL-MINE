"use client"

import { createClient } from "@/src/utils/supabase/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import closeButton from "@/public/icons/close button cart.svg";

interface transactionInfoProps {
  // id transaction, id product, quantity, price, totalcost
  transactionDetails: any[][];
  transactionCost: number;
  onClose: () => void;
}

const TransactionInfo: React.FC<transactionInfoProps> = ({ transactionDetails, transactionCost, onClose }) => {

  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    const idtransaction = transactionDetails[0][0];
    getTransactionInfo(idtransaction);
  }, []);

  const getTransactionInfo = async (idtransaction: number) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("transaction")
        .select("username, transactiondate, totalcost")
        .eq("idtransaction", idtransaction);
  
      if (error) {
        throw error;
      }
  
      const formattedDate = data[0]?.transactiondate.toString().split('T');
      const date = formattedDate[0];
      const time = formattedDate[1];
    
      const fixedDate = `${date} ${time}`;

      if (data) {
        setInfo({idtransaction, username: data[0]?.username, transactiondate: fixedDate, totalcost: data[0]?.totalcost});
      }

    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-50 justify-center bg-opacity-100 backdrop-filter backdrop-blur-sm mx-auto my-auto mb-40 bg-white shadow-md sm:rounded-lg"
        style={{ width: "600px", height: "450px" }}
      >
        <h1 className="heading bold-20 px-4 pt-6 pb-2">Detail Transaksi</h1>
        <button 
          className="absolute top-8 right-8"
          onClick={() => {
            onClose();
          }}
        >
          <Image src={closeButton} alt={"close"} />
        </button>

        <div className="flex items-center px-6 semibold-12 text-[#878787]">
          No. ID Transaksi :{" "}
          <div className="px-1">
            <span className="regular-12"># { info.idtransaction }</span>
          </div>
        </div>

        <div className="flex items-center px-6 semibold-12 text-[#878787]">
          Tanggal :{" "}
          <div className="px-1">
            <span className="regular-12">{ info.transactiondate }</span>
          </div>
        </div>

        <div className="flex items-center px-6 semibold-12 text-[#878787]">
          Username Pegawai Kasir :{" "}
          <div className="px-1">
            <span className="regular-12">{ info.username }</span>
          </div>
        </div>

        <div className="bold-12 mx-6 grid grid-cols-2 text-center text-black pt-4 pb-2 relative border-b">
          <div className="flex justify-start">Product</div>
          <div className="grid grid-cols-3">
            <div>Harga</div>
            <div className="mx-4">Qty</div>
            <div>Subtotal</div>
          </div>
        </div>

        {/* order info */}
        <div
          className={"text-black"}
          style={{ height: "225px", overflowY: "auto", overflowX: "auto" }}
        >
          {/* fetch data transaction details */}
          {transactionDetails.map((order, index) => (
            <div key={index}>
              <div className="py-2 mx-6 border-b grid grid-cols-2 regular-12">
                <div className="flex justify-between items-center">
                  <div
                    style={{
                      maxWidth: "270px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    { order[1] }
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex justify-center">
                   {`Rp${order[3].toLocaleString("id-ID")},00`}
                  </div>
                  <div className="flex justify-center mx-4">
                    { order[2] }
                  </div>
                  <div className="flex justify-center">
                  {`Rp${(order[2]*order[3]).toLocaleString("id-ID")},00`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 mx-6 pt-4 semibold-18 text-black">
          <div >Total</div>
          <div className="flex justify-end text-blue-500">
            {`Rp${transactionCost.toLocaleString("id-ID")},00`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfo;