import Image from "next/image";
import editButton from "../../public/icons/edit button.svg"
import deleteButton from "../../public/icons/delete button.svg"

export default function ActionButton(){
    return(
        <div className="p-2 flex justify-center space-x-4">
            <button className="btn btn-info btn-sm">
                <Image src={editButton} alt="edit"/>
            </button>
            <button className="btn btn-error btn-sm">
                <Image src={deleteButton} alt="delete"/>
            </button>
        </div>
    );
}