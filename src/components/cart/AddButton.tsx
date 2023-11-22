import React from 'react';
import Image from "next/image";
import addButton from "@/public/icons/add button.svg"
import addHoverButton from "@/public/icons/add button hover.svg"

interface AddedButtonProps {
    onButtonClick: () => void;
}

const PopupNotification: React.FC = () => {
    return (
      <div className="regular-14 flex fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 py-2 px-8 rounded-lg z-50 outline outline-1 outline-green-500">
        <span className="mr-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5">
            <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd" />
            </svg>
        </span>
        Product is added
      </div>
    );
  };

const AddedButton: React.FC<AddedButtonProps> = ({ onButtonClick }) => {
    const [isClicked, setIsClicked] = React.useState(false);

    React.useEffect(() => {
        if (isClicked) {
            setTimeout(() => {
                setIsClicked(false);
        }, 1000);
        }
    }, [isClicked]);

    return (
        <div className="group inline-block relative">
            <button className="transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                <Image src={addButton} alt="add" />
            </button>
            <button className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute top-0 left-0" onClick={() => { onButtonClick(); setIsClicked(true); }}>
                <Image src={addHoverButton} alt="add hover" />
            </button>

        {isClicked && (<PopupNotification /> )}
        </div>
    );
}

export default AddedButton;