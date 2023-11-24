import React from "react";
import { useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

interface PopupProps {
    message: any;
    color: any;
    isClicked: boolean;
    onClicked: (clicked: boolean) => void;
}

const PopupNotification: React.FC<PopupProps> = ({ message, color, isClicked, onClicked }) => {
    const bgcolor: string = color === "green" ? "bg-green-100" : "bg-red-100";
    const textcolor: string = color === "green" ? "text-green-800" : "text-red-800";
    const outlinecolor: string = color === "green" ? "outline-green-500" : "outline-red-500";

    useEffect(() => {
        if (isClicked) {
            setTimeout(() => {
                onClicked(false);
            }, 1000);
        }
    }, [isClicked]);

    return isClicked ? (
        <div className={`regular-14 flex fixed top-4 left-1/2 transform -translate-x-1/2 ${bgcolor} ${textcolor} py-2 px-6 rounded-lg z-50 outline outline-1 ${outlinecolor}`}>
            <span className="mr-2 text-lg">
                { color === "green" ? <FaCheckCircle /> : null }
                { color === "red" ? <RiErrorWarningFill /> : null }
            </span>
            { message }
        </div>
    ) : null;
};

export default PopupNotification;