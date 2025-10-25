export function ErrorMessage({message}: {message: string}){
    return (
        <div className="font-semibold text-sm text-red-500 mt-2">
            {message}
        </div>
    );
}

