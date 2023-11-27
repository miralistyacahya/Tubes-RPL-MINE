import React from "react";
import Image from "next/image";
import addButton from "@/public/icons/add button.svg";
import addHoverButton from "@/public/icons/add button hover.svg";
import PopupNotification from "../table/PopupNotification";

interface AddedButtonProps {
  onButtonClick: () => void;
}

const AddedButton: React.FC<AddedButtonProps> = ({ onButtonClick }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <div className="group inline-block relative">
      <button className="transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0">
        <Image src={addButton} alt="add" />
      </button>
      <button
        className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute top-0 left-0"
        onClick={() => {
          onButtonClick();
          setIsClicked(true);
        }}
      >
        <Image src={addHoverButton} alt="add hover" />
      </button>

      <PopupNotification
        message={"Produk ditambahkan ke keranjang"}
        color={"green"}
        isClicked={isClicked}
        onClicked={(onClicked) => setIsClicked(onClicked)}
      />
    </div>
  );
};

export default AddedButton;
