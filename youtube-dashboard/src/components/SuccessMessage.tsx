export function SuccessMessage({message}: {message: string}){
    return (
        <div className="font-semibold text-sm text-green-500">
            {message}
        </div>
    );
}

