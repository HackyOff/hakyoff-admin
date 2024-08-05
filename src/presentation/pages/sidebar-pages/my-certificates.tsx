import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/auth-context';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';
import { FaTrophy, FaDownload } from 'react-icons/fa';
import { bg } from '@/utils/image-exporter';
import { fetchCertificates } from '@/services/certificate-service';
import { DateUtils } from '@/utils/dateutils';
import { FaEye } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Modal } from '@/presentation/components/modal-ticket/modal-ticket';

import { certificateTemplateGenerated } from '@/utils/templates/certificate-template-grenerated';


export interface Certificate {
  courseId: string;
  courseName: string;
  downloadUrl: string;
  generatedAt: string;
  id: string;
  studentEmail: string;
  certificate_id?: string
  studentName: string;
  studentPhoneNumber: string;
}


export const MyCertificates: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const { userSettings, currentUser } = useAuth();

  const fetchUserCertificates = useCallback(async (email: string) => {
    try {
      const certificatesData = await fetchCertificates(email);
      setCertificates(certificatesData);
    } catch (error) {
      console.error('Erro ao buscar certificados:', error);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      fetchUserCertificates(currentUser.email);
    }
  }, [currentUser?.email, fetchUserCertificates]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);


  const handleDownload = useCallback((url: string, courseName: string) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = currentUser?.displayName + "_" + courseName + "_certificate_" + DateUtils.formatDateTimeToPTT(new Date()) + ".pdf";
        alink.click();
      });
    });
  }, [currentUser?.displayName]);

  const handleView = useCallback((certificate: any) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  }, []);



  const renderedCertificates = useMemo(() => (
    certificates.length > 0 ? (
      <div className="flex justify-start gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            className="my-4 h-[7em] w-[12em] relative text-start bg-slate-100/10 rounded-lg"
          >
            <img src={bg.bg_certificate_filled} className='w-full' alt="" />
            <motion.div
              className="grid h-[8.5em] items-center place-content-center absolute top-0 bottom-0 left-0 right-0 bg-black/60"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-5">
                <button
                  title='Visualizar certificado'
                  onClick={() => handleView(certificate)}
                  className="cursor-pointer bg-primary p-2 text-black"
                >
                  <FaEye className='' />
                </button>
                <button
                  title='Baixar certificado'
                  onClick={() => handleDownload(certificate.downloadUrl, certificate.courseName)}
                  className="cursor-pointer bg-primary p-2 text-black"
                >
                  <FaDownload className='' />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className='sm:py-[10rem]'>
        <FaTrophy className='lg:text-[8em]  text-gray-500 text-[6em] dark:text-white/70 mx-auto' />
        <br />
        <h2 className="dark:text-white/70 text-gray-500 hacker">
          Seus certificados pendentes aparecerão aqui!
        </h2>
      </div>
    )
  ), [certificates, handleDownload, handleView]);

  return (
    <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
      <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
        <div className="flex sm:mt-10 dark:bg-slate-100/10 dark:text-white justify-between w-full px-5 py-6 bg-white rounded-lg shadow">
          <h2 className="sm:text-3xl text-xl font-bold hacker">Meus Certificados</h2>
        </div>
        <br />
        <div className="bg-white dark:bg-slate-100/10 dark:text-white text-center rounded-lg shadow w-full py-10 px-5">
          {renderedCertificates}
        </div>
      </div>
      {isModalOpen && selectedCertificate && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="mb-1 text-xl font-bold">{selectedCertificate.courseName}</h2>
          <hr />
          <div className="flex justify-between sm:flex-row flex-col gap-3 my-3 text-sm hacker">
            <div>
              <span className="my-auto text-xs">Emitido em: {selectedCertificate.generatedAt}</span>

            </div>
            <button
              title='Baixar certificado'
              onClick={() => handleDownload(selectedCertificate.downloadUrl, selectedCertificate.courseName)}
              className="cursor-pointer bg-primary flex gap-2 py-1 text-xs px-3 text-black"
            >
              Baixar <FaDownload className='' />
            </button>
          </div>
          <div className='w-full hacker' dangerouslySetInnerHTML={{ __html: certificateTemplateGenerated(selectedCertificate.studentName, selectedCertificate.courseName, selectedCertificate.certificate_id, selectedCertificate.generatedAt) }} />

        </Modal>
      )}
    </div>
  );
};
