import { Link } from "react-router-dom";

interface IWarningProps {
    label: string;
    linkText: string;
    to: string;
}

export function Warning({label, linkText, to}: IWarningProps){
    return (
        <div className="py-2 text-sm text-gray-400">
            {label}{" "}
            <Link to={to} className="text-green-500 hover:text-green-400 underline font-medium">
                {linkText}
            </Link>
        </div>
    );
}

