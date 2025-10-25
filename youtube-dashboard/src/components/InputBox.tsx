interface IInputBoxProps {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function InputBox({label, placeholder, onChange, type = "text"}: IInputBoxProps){
    return (
        <div>
            <div className="text-sm font-medium text-left py-2 text-gray-300">
                {label}
            </div>
            <input 
                onChange={onChange} 
                placeholder={placeholder} 
                type={type}
                className="w-full px-3 py-2 border border-gray-700 rounded-md font-normal bg-black text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
            />
        </div>
    );
}

