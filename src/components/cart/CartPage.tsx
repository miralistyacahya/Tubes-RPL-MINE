import { useState } from 'react';
import { MinButton, PlusButton, CloseButton } from '@/src/components/ActionButton';
import Button from '@/src/components/Button'

interface CartProps {
    cart: (string | number)[][];
    cartTotal: number;
}

const CartPage: React.FC<CartProps> = ({ cart, cartTotal }) => {
    return (
        <div className="mt-20 bg-white shadow-md sm:rounded-lg">
            <h1 className="heading bold-20 pt-4 pb-4 text-center">Keranjang</h1>
            <div className="px-6" style={{height: "512px"}}>
                { cart.length === 0 ? (
                    <div className="regular-16 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}><i>Tidak ada barang di keranjang</i></div>
                ) : (
                    <div>
                        <div className= "medium-14 text-[#737272]">Tanggal : 26/10/2023</div>
                        <div className= "medium-14 text-[#737272]">Pegawai Kasir : Toqeqrin</div>
                        <div className= "bold-14 grid grid-cols-2 text-center pt-4 pb-2 relative border-b">
                            <p>Product</p>
                            <p className="ml-6">Qty</p>
                        </div>

                        <div style={{height: "320px", overflowY: 'auto', overflowX: 'auto'}}>
                            {cart.map((product, index) => (
                                <div key={index}>
                                    <div className="py-2 border-b">
                                        <div className="flex justify-between items-center">
                                            <div className="medium-14 py-1" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                                { product[1] }
                                            </div>
                                            <div className="flex items-center">
                                                <MinButton />
                                                <div className="medium-14 w-8 text-center">
                                                    { product[3] }
                                                </div>
                                                <div className="mr-4">
                                                    <PlusButton />
                                                </div>
                                                <CloseButton />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center grid grid-cols-2">
                                        <div className="medium-12 text-[#A3A3A3] flex mr-auto">
                                            { product[2] }
                                        </div>
                                        <div className="semibold-12 w-28 ml-auto mr-7 text-right">
                                            { Number(product[2])* Number(product[3]) }
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 pb-2">
                                <div className="flex justify-between semibold-16">
                                    <div>
                                        Total
                                    </div>
                                    <div>
                                        { cartTotal }
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center grid grid-cols-2">
                                <div>
                                    <Button
                                        type="button"
                                        title="Pembayaran Gagal"
                                        round="rounded-lg"
                                        variant="btn_red"
                                        size="bold-12"
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        title="Pembayaran Berhasil"
                                        round="rounded-lg"
                                        variant="btn_green"
                                        size="bold-12"
                                    />
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    )
};

export default CartPage;