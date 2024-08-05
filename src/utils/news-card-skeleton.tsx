
export const renderCardNewsSkeletons = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full gap-2 p-2 bg-gray-200 flex rounded-lg shadow animate-pulse">
                    <div className="  h-[6em] w-[10em]  bg-gray-300 rounded-md"></div>
                    <div className="w-full ">
                        <div className=" h-[4em] w-full mb-2 bg-gray-300 rounded-md"></div>
                        <div className="  h-[1em] w-full bg-gray-300 rounded-md"></div>
                    </div>

                </div>
            ))}
        </div>
    );
};