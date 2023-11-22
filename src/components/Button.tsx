import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    round: string;
    variant: string;
    size: string;
    full?: boolean
    onButtonClick: () => void;
}

const Button = ({type, title, icon, round, variant, size, full, onButtonClick} : ButtonProps) => {
  return (
    <button
    className={`flexCenter gap-2 ${round} border ${variant} ${full && 'w-full'}`}
    type = {type} onClick = { onButtonClick }
    >
        {icon && <Image src={icon} alt={title} width={20} height={20} />}
        <label className={`${size} whitespace-nowrap cursor-pointer`}>{title}</label>
    </button>
  )
}

export default Button