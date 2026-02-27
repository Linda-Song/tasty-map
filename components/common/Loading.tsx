export default function Loading({ className = "" }: { className?: string }) {
    return (
        <>
            <div className={`w-full h-20 animate-pulse bg-gray-200 rounded-b-md ${className}`}/>
            {[...Array(10)].map((e,i) => (
            <div className="w-full h-20 animate-pulse bg-gray-100 rounded-md mt-2" 
            key={i}/>
            ))}        
        </>
    )
}   





