
export  const renderTicketSkeletons = () => {
    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full p-4 mb-4 bg-gray-200 rounded-lg shadow animate-pulse">
                    <div className="h-6 mb-2 bg-gray-300 rounded-md"></div>
                    <div className="h-4 mb-2 bg-gray-300 rounded-md"></div>
                    <div className="h-4 mb-2 bg-gray-300 rounded-md"></div>
                     
                </div>
            ))}
        </div>
    );
};
