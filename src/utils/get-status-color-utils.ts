
export function GetStatusColor(status: string) {
    switch (status) {
        case 'Não Respondido':
            return 'bg-red-600 font-semibold text-white py-1 sm:px-3 my-1 w-auto rounded-md';
        case 'Pendente':
            return 'bg-orange-200   font-semibold text-orange-700 py-2 sm:px-3 my-1 w-auto rounded-md';
        case 'Resolvido':
            return 'bg-green-700 font-semibold text-white py-1 sm:px-3 my-1 w-auto rounded-md';
        default:
            return '';
    }
}