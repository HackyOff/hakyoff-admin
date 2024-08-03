

export const renderCardSkeletons = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full p-4 bg-gray-200 rounded-lg shadow animate-pulse">
                    <div className="h-32 mb-4 bg-gray-300 rounded-md"></div>
                    <div className="h-6 mb-2 bg-gray-300 rounded-md"></div>
                    <div className="h-6 mb-2 bg-gray-300 rounded-md"></div>

                </div>
            ))}
        </div>
    );
};
