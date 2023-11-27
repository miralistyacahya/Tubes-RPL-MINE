import React, { useState } from 'react';
import { IoInformationCircleOutline, IoInformationCircleSharp } from 'react-icons/io5';

interface InformationButtonProps {
    onButtonClick:() => void;
}

const InfoButton: React.FC<InformationButtonProps> = ({ onButtonClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            onClick={onButtonClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="focus:outline-none"
        >
            {isHovered ? (
                <IoInformationCircleSharp size={20} />
            ) : (
                <IoInformationCircleOutline color="heading" size={20} />
            )}
        </button>
    );
};

export default InfoButton;