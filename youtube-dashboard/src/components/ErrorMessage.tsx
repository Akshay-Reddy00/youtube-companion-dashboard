export function ErrorMessage({message}: {message: string}){
    return (
        <div className="font-semibold text-sm text-red-600">
            {message}
        </div>
    );
}

