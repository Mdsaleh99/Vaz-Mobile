"use client"

import { IconType } from "react-icons";


interface ButtonProps {
    label: string,
    disabled?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    outline?: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Button: React.FC<ButtonProps> = ({label, disabled, outline, custom, small, icon:Icon, onClick}) => {
    return ( 
        <button disabled={disabled} onClick={onClick} className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${outline ? "bg-white" : "bg-slate-700"}
        ${outline ? "text-slate-700" : "text-white"} ${small ? "text-sm font-light" : "text-md font-semibold"} ${small ? "px-1 py-2 border-[1px]" : "py-3 px-4 border-2"} ${custom ? custom : ''}`}>
            {/* now initially small is false so by default it applies "py-3 px-4 border-2" this when we use <Button /> */}
            {Icon && <Icon size={24} />}
            {label}
        </button>
    );
}
 
export default Button;