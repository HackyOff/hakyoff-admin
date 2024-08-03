import { IconType } from "react-icons";
import { FaExclamationTriangle, FaFilePdf, FaFileWord } from "react-icons/fa";
import { FaFileExcel, FaFileImage, FaFilePowerpoint, FaFileVideo } from "react-icons/fa6";

// utils/fileIcons.ts
export const getFileIcon = (fileName: string): IconType => {
    const extension = fileName.split('.').pop();
    switch (extension) {
        case 'pdf':
            return FaFilePdf;
        case 'doc':
        case 'docx':
            return FaFileWord;
        case 'ppt':
        case 'pptx':
            return FaFilePowerpoint;
        case 'xls':
        case 'xlsx':
            return FaFileExcel;
        case 'jpg':
        case 'jpeg':
        case 'png':
            return FaFileImage;
        case 'mp4':
        case 'avi':
            return FaFileVideo;
        default:
            return FaExclamationTriangle;
    }
};


export const getFileNameFromUrl = (url: string): string => {
    const parts = url.split('%2F');
    return parts[parts.length - 1].split('?')[0].replace(/%20/g, ' ');
};
