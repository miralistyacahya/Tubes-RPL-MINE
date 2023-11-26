"use client"

import Navbar from "@/src/components/Navbar";
import Pagination from "@/src/components/Pagination";
import Table, { TableColumn } from "@/src/components/Table"
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from "@/src/constants";
import { transaction } from "@/src/types";
import { createClient } from "@/src/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { PostgrestError } from '@supabase/supabase-js';
import InfoButton from "@/src/components/transaction/InfoButton";
import TransactionInfo from "@/src/components/transaction/TransactionInfo";

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

const columns: TableColumn[] = [
    { label: 'ID', dataKey: 'idtransaction', width: '1/5', align: 'center' },
    { label: 'Tanggal', dataKey: 'transactiondate', width: '1/5', align: 'center' },
    { label: 'Username', dataKey: 'username', width: '1/5', align: 'center' },
    { label: 'Total Harga', dataKey: 'totalcost', width: '1/5', align: 'center' },
    { label: 'Info', dataKey: 'aksi', width: '1/5', align: 'center' },
];

export default function app() {
    const [dataItem, setDataItem] = useState<transaction[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const dataPerPage = 10;
    const pageVisited = pageNumber * dataPerPage;
    const pageVisitedTo = pageVisited + dataPerPage;
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const supabase =  createClient();
                
                // fetch count data transaction
                const totalCountQuery = supabase.from('transaction').select('count');

                const { data: totalCountResponse } = await totalCountQuery;
                setTotalCount(totalCountResponse?.[0]?.count || 0);

                const newPageCount = Math.ceil(totalCount/dataPerPage);
                setPageCount(newPageCount);

                // fetch data transaction
                let transactionQuery = supabase.from('transaction').select('idtransaction, transactiondate, username, totalcost').range(pageVisited, pageVisitedTo - 1);
                
                const { data: transactionData, error } = await transactionQuery;
                if (error) {
                  throw error;
                }

                if (transactionData) {
                    setDataItem(transactionData);
                }

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }        
        };

        fetchData();

    }, [pageVisited, pageVisitedTo, totalCount]);

    // handle information
    const [transactionDetails, setTransactionDetails] = useState<any[][]>([]);
    const [isTransactionInfoVisible, setTransactionInfoVisible] = useState(false);
    const [isBlurActive, setBlurActive] = useState(false);

    // blur effect
    const openPopup = () => {
        setBlurActive(true); 
    };
    
    const closePopup = () => {
        setBlurActive(false); 
    };

    const handleButtonInfoClick = async (idtransaction: number, totalcost: number) => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
              .from("orders")
              .select("idproduct, quantity, price")
              .eq("idtransaction", idtransaction);
      
            if (error) {
              throw error;
            }
      
            if (data) {
                const productData = data.map((product) => [
                    idtransaction,
                    product.idproduct,
                    product.quantity,
                    product.price,
                ]);
          
            setTransactionDetails(productData);
            setTransactionInfoVisible(true);
            setTotalCost(totalcost);
            openPopup();

            }
          } catch (error: any) {
            console.error("Error fetching data:", error.message);
          }
    }

    const displayData = dataItem.map((transaction) => {
        const transdate = transaction.transactiondate.toString().split('T');
        const date = transdate[0];
        const time = transdate[1];
      
        const formattedDate = `${date} ${time}`;
      
        return {
            idtransaction: transaction.idtransaction || 'N/A',
            transactiondate: formattedDate || 'N/A',
            username: transaction.username || 'N/A',
            totalcost: `Rp${transaction.totalcost.toLocaleString('id-ID')},00` || 'N/A',
            aksi:     
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <InfoButton onButtonClick={() => handleButtonInfoClick(transaction.idtransaction, transaction.totalcost)}/>
            </div>
        
        };
      });
      
    const isAdmin = false 
    const isKasir = true
    const isInventaris = false

    return (
        <div>
            <div  className={isBlurActive ? 'blurred-page' : ''}>
                <Navbar 
                listOfNav={
                    (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
                }
                />
                <div className='mx-16'>
                    <h1 className="heading bold-28 mt-8">Daftar Riwayat Transaksi</h1>
                    <div className="mt-6 mb-12 bg-white shadow-md sm:rounded-lg">
                        <div className="pt-12">
                            <Table columns={columns} data={displayData} message={"Tidak ada riwayat transaksi"}/>
                            <div className='grid grid-cols-3 items-center'>
                                <div className='hidden lg:flex'>
                                    <p className="text-sm text-gray-700 pl-8"> 
                                        {(!columns || !displayData || displayData.length === 0) ? 
                                        `Showing 0 to 0 of 0 results`
                                        : `Showing ${pageVisited + 1} to ${pageVisitedTo > totalCount ? totalCount : pageVisitedTo} of ${totalCount} results`
                                        }
                                    </p>
                                </div>
                                <div className='col-start-2 flex justify-center'>
                                    <Pagination
                                    setPageNumber={setPageNumber}
                                    currentPage={pageNumber}
                                    pageCount={pageCount}
                                    />
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>

            {isTransactionInfoVisible && (
                <TransactionInfo
                    transactionDetails={transactionDetails}
                    transactionCost = {totalCost}
                    onClose={() => {
                        setTransactionInfoVisible(false);
                        closePopup();
                    }}
                />
            )}
        </div>

    )
}