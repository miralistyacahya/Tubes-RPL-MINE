import React from 'react';
import Image, { StaticImageData } from "next/image";

interface CartButtonProps {
    src: StaticImageData;
    alt: string;
    onButtonClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ src, alt, onButtonClick }) => {
    return (
        <div className="flex items-center">
            <button style={{ width: '20px', height: '20px' }} onClick={ onButtonClick }>
                <Image src={ src } alt={ alt } />
            </button>
        </div>
    )
}

export default CartButton;