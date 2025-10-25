interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

export function Button({label, onClick, className}: IButtonProps){
    
    // const variantStyles = {
    //     primary: "bg-green-500 hover:bg-green-600 text-black",
    //     secondary: "bg-black hover:bg-gray-900 text-white border border-gray-700 hover:border-gray-600"
    // };
    
    return (
        <button 
            onClick={onClick} 
            className={`${className} w-full text-sm px-5 py-3 mb-2 rounded-lg text-white font-medium bg-green-700 hover:bg-green-800`}
        >
            {label}
        </button>
    );
}

