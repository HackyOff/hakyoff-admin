// Certificate.tsx
import React from 'react';

interface CertificateProps {
    studentName: string;
    courseName: string;
    date: string;
}

const Certificate: React.FC<CertificateProps> = ({ studentName, courseName, date }) => {
    return (
        <div id="certificate" style={styles.certificate}>
            <div style={{ ...styles.text, ...styles.name }}>{studentName}</div>
            <div style={{ ...styles.text, ...styles.course }}>{courseName}</div>
            <div style={{ ...styles.text, ...styles.date }}>{date}</div>
        </div>
    );
};

const styles = {
    certificate: {
        width: '1123px',
        height: '793px',
        position: 'relative' as 'relative',
        backgroundImage: 'url(/path/to/Certficado.png)',
        backgroundSize: 'cover',
        fontFamily: 'Arial, sans-serif',
        color: '#fff'
    },
    text: {
        position: 'absolute' as 'absolute',
        fontSize: '24px',
        fontWeight: 'bold',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    name: {
        top: '40%'
    },
    course: {
        top: '50%'
    },
    date: {
        bottom: '10%'
    }
};

export default Certificate;
