import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    round: string;
    variant: string;
    full?: boolean
}

const Button = ({type, title, icon, round, variant, full} : ButtonProps) => {
  return (
    <button
    className={`flexCenter gap-2 ${round} border ${variant} ${full && 'w-full'}`}
    type = {type}
    >
        {icon && <Image src={icon} alt={title} width={20} height={20} />}
        <label className="semibold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  )
}

export default Button