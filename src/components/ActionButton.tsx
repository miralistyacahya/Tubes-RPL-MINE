import Image from "next/image";
import editButton from "../../public/icons/edit button.svg"
import deleteButton from "../../public/icons/delete button.svg"
import minusButton from '@/public/icons/min button cart.svg';
import plusButtonCart from '@/public/icons/plus button cart.svg';
import closeButtonCart from '@/public/icons/close button cart.svg';


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

export function MinButton() {
    return (
        <div className="flex items-center">
            <button style={{ width: '20px', height: '20px' }}>
                <Image src={ minusButton } alt="min" />
            </button>
        </div>
    )
}

export function PlusButton() {
    return (
        <div className="flex items-center">
            <button style={{ width: '20px', height: '20px' }}>
                <Image src={ plusButtonCart } alt="min" />
            </button>
        </div>
    )
}

export function CloseButton() {
    return (
        <div>
            <button>
                <Image src={ closeButtonCart } alt="close" />
            </button>
        </div>
    )
}