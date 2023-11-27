import Image from "next/image";
import tutup from "../../public/icons/tutup.svg";
import { useState } from "react";

export default function TutupButton(){
    return(
        <div className="modal-header flex justify-end">
            <button className="close-button ">
                <Image src={tutup} alt="edit"/>
            </button>
        </div>
    );
}
