import axios from "axios";
import UAParser from "ua-parser-js";

export const getCurrentDevice = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    return `${result.browser.name} on ${result.os.name}`;
};

export const getCurrentIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error getting IP address:', error);
        return 'Unknown IP';
    }
};