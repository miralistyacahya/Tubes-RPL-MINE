import React from "react";
import Image, { StaticImageData } from "next/image";
import PopupNotification from "../table/PopupNotification";

interface CartButtonProps {
  src: StaticImageData;
  alt: string;
  message: string;
  color: string;
  onButtonClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({
  src,
  alt,
  onButtonClick,
  message,
  color,
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <div>
      <div className="flex items-center">
        <button
          style={{ width: "20px", height: "20px" }}
          onClick={() => {
            onButtonClick();
            setIsClicked(true);
          }}
        >
          <Image src={src} alt={alt} />
        </button>
      </div>

      <PopupNotification
        message={message}
        color={color}
        isClicked={isClicked}
        onClicked={(onClicked) => setIsClicked(onClicked)}
      />
    </div>
  );
};

export default CartButton;
