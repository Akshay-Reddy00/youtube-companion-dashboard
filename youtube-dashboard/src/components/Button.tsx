interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
}

export function Button({label, onClick, className, variant = 'primary'}: IButtonProps){
    const baseStyle = "w-full text-sm px-5 py-3 mb-2 rounded-lg font-medium transition-all duration-200";
    
    const variantStyles = {
        primary: "bg-green-500 hover:bg-green-600 text-black",
        secondary: "bg-black hover:bg-gray-900 text-white border border-gray-700 hover:border-gray-600"
    };
    
    return (
        <button 
            onClick={onClick} 
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        >
            {label}
        </button>
    );
}

