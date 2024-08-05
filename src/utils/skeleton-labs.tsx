


export const renderLabsSkeletons = (length: number) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: length }).map((_, index) => (
                <div key={index} className="w-full p-4 bg-gray-200 rounded-lg shadow animate-pulse">
                    <div className="grid gap-3 grid-cols-2">
                        <div className="h-[3rem] w-[8/12] mb-2 bg-gray-300 rounded-md"></div>
                        <div className="h-[3rem] w-[2/12] mb-2  bg-primary/20  rounded-md"></div>

                    </div>
                    <div className="h-[5rem] mb-4 bg-gray-300 rounded-md"></div>

                </div>
            ))}
        </div>
    );
};
