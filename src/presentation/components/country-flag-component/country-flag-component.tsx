
import WorldFlags from 'react-world-flags';
interface CC {
    countryCode: string
}
export const CountryFlag = ({ countryCode }: CC) => {
    return (
        <WorldFlags code={countryCode} className="w-[1.5em]" alt="country flag" />
    );
};