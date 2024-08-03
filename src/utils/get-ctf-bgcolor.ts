
export const getCTFBackgroundColor = (level: string) => {
    switch (level) {
        case 'Beginner':
            return 'bg-green-500 text-white';
        case 'Intermediate':
            return 'bg-gray-600 text-white';
        case 'Advanced':
            return 'bg-red-500 text-white';
        default:
            return 'white';
    }
};