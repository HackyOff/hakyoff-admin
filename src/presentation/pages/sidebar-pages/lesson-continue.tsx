import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTabsMyCourse, useCourseMaterials, useCourseModules } from '@/utils/courseData-tabs';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';
import { ITraining, Lesson } from '@/interfaces/training/training';
import { HakyOffSquare } from '@/presentation/components';
import TabsComponent from '@/presentation/components/dashboard-components/tabs-components/tabs_components';
import { useAuth } from '@/context/auth-context';
import { fetchOneCourseData } from '@/utils/my-course-utils';
// import { CommentSection } from './course-review';
import ReactPlayer from 'react-player';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchLessons, fetchModules, loadUserProgress, saveCertificateData, saveExamData, updateUserProgress } from '@/services/user-course-service';
import { storage } from '@/domain/config/firebase';
import { AlertUtils } from '@/utils/alert-utils';
import jsPDF from 'jspdf'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { certificateTemplate } from '@/utils/templates/certificate-template';
import { RANDOM_CODE } from '@/domain/config/navbar-config';
import { FaSpinner } from 'react-icons/fa6';
import { DateUtils } from '@/utils/dateutils';


export const ContinueLesson: React.FC = () => {
    const { id_course } = useParams();
    const [isOpen, setIsOpen] = useState(true);
    const [gerando, setGerando] = useState(false);
    const [totalLessonss, settotalLessonss] = useState(0);
    const [course, setCourse] = useState<ITraining | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]); // Armazena as aulas concluídas
    const { userSettings, currentUser } = useAuth();

    useEffect(() => {
        fetchOneCourseData(setCourse, id_course ? id_course : '');

    }, [id_course]);

    useEffect(() => {
        if (course && course.modules && course.modules.length > 0) {
            const firstLesson = course.modules[0].lessons[0];
            setCurrentLesson(firstLesson);
        }
    }, [course]);

    useEffect(() => {
        if (currentUser && id_course) {
            // Carregar as aulas concluídas do Firestore
            loadUserProgress(currentUser.uid, id_course, setCompletedLessons);
        }
    }, [currentUser, id_course]);


    useEffect(() => {
        async function g() {

            const modules = await fetchModules(id_course ? id_course : '');

            //console.log(modules)
            // Buscar todas as lições de cada módulo e calcular o número total de lições
            let totalLessons = 0;
            for (const module of modules) {
                const lessons = await fetchLessons(module.id);
                totalLessons += lessons.length;
            }

            settotalLessonss(totalLessons)
        }

        g()
    }, [])

    document.title = course?.title + ' | HakyOff Academy';

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const modules = useCourseModules(course?.id ? course?.id : '');
    const materials = useCourseMaterials(course?.id ? course?.id : '');

    const tabs = getTabsMyCourse(course, modules, materials, setCurrentLesson, completedLessons);



    const handleCompleteLesson = async () => {
        if (currentUser && currentLesson) {
            const updatedCompletedLessons = [...completedLessons, currentLesson.id];
            setCompletedLessons(updatedCompletedLessons);

            // Buscar todos os módulos do curso
            // console.log(id_course)

            const modules = await fetchModules(id_course ? id_course : '');

            //console.log(modules)
            // Buscar todas as lições de cada módulo e calcular o número total de lições
            let totalLessons = 0;
            for (const module of modules) {
                const lessons = await fetchLessons(module.id);
                totalLessons += lessons.length;
            }

            // Verificar se totalLessons não é zero para evitar divisão por zero
            if (totalLessons > 0) {
                /*
                console.log(totalLessons);
                console.log("Updating progress and completed lessons in Firestore");
                console.log("Completed Lessons:", updatedCompletedLessons);
                console.log("Total Lessons:", totalLessons);
*/
                // Atualizar o progresso no Firestore
                await updateUserProgress(currentUser.uid, id_course ? id_course : '', updatedCompletedLessons, totalLessons);
            } else {
                //  console.log(totalLessons);
                console.log('asd')
            }
        }
    };





    // Calcular o progresso do estudante
    // const totalLessons = course?.modules?.reduce((acc, module) => acc + module.lessons.length, 0) || 0;
    const completedCount = completedLessons.length;

    //console.log('Total lessons:' + totalLessonss)
    //console.log('Completed:' + completedCount)

    // Verificar se todas as lições foram concluídas
    const allLessonsCompleted = totalLessonss > 0 && completedCount === totalLessonss;



    const handleRequestExam = async () => {
        if (currentUser && course && course.id) { // Verifique se course.id está definido
            const examData = {
                courseId: course.id,
                courseName: course.title,
                totalLessons: totalLessonss,
                studentName: currentUser.displayName || '',
                studentId: currentUser.uid,
                email: currentUser.email || '',
                phone: currentUser.phoneNumber || '',
                photoUrl: currentUser.photoURL || '',
                requestDate: new Date().toISOString()
            };

            await saveExamData(examData);
            AlertUtils.success('Seu pedido de exame foi submetido com sucesso !');
        }
    };



    const handleGenerateCertificate = async () => {
        if (currentUser && course && course.id) {
            const dateIssued = DateUtils.formatDateToPTT(new Date())
            const certId = RANDOM_CODE
            const htmlContent = certificateTemplate(currentUser.displayName, course.title, certId, dateIssued);
            setGerando(true)
            const doc = new jsPDF('landscape');

            //const bgBase64 = await loadImageAsBase64('https://raw.githubusercontent.com/Katumbela/my_images/9dcd7cac9c5274ff79cb1c91ac41737e4c57a293/Certficado.png');

            const pageWidth = 174.5; // largura em mm

            // Adicionar a imagem de fundo antes de adicionar o conteúdo HTML
            //doc.addImage(bgBase64, 'PNG', 10, 0, 1200, pageHeight);

            doc.html(htmlContent, {
                callback: async (doc) => {
                    const pdfBlob = doc.output('blob');
                    const certificateUrl = await saveCertificateStorage(pdfBlob);

                    const certificateData = {
                        courseId: course.id ? course.id : '',
                        courseName: course.title,
                        studentName: currentUser.displayName,
                        studentEmail: currentUser.email,
                        studentPhoneNumber: currentUser.phoneNumber,
                        downloadUrl: certificateUrl,
                        generatedAt: dateIssued,
                        certificate_id: certId
                    };

                    await saveCertificateData(certificateData);

                    downloadCertificate(certificateUrl);
                    setGerando(false)
                },
                x: 0,
                y: 0,
                width: pageWidth, // largura em mm
                windowWidth: 720 // largura da janela em pixels
            });
        }
    };

    const downloadCertificate = (url: string) => {
        fetch(url).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = currentUser?.displayName + "_" + course?.title + "_H4KY0FF_certificate_" + DateUtils.formatDateTimeToPTT(new Date()) + ".pdf";
                alink.click();
            });
        });
    };



    const saveCertificateStorage = async (pdfBlob: Blob): Promise<string> => {
        const storageRef = ref(storage, `certificates/${currentUser?.uid}_${course?.id}_${new Date().toISOString()}.pdf`);

        await uploadBytes(storageRef, pdfBlob);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    };


    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <div className="flex gap-4">
                    <div className="relative w-full p-4 bg-white dark:bg-slate-100/10 rounded-lg">
                        <div className="flex justify-between">
                            <HakyOffSquare />
                        </div>
                        <h2 className="mt-4 text-3xl dark:text-white font-bold hacker text-">
                            {course?.title}
                        </h2>
                        {allLessonsCompleted && (
                            <div className="mt-4">
                                {
                                    course?.benefits && course.benefits[0].exam ? <button onClick={handleRequestExam} className="px-3 click font-semibold py-1 bg-primary text-dark text-sm rounded-md">
                                        Solicitar Exame
                                    </button>
                                        :
                                        <button disabled={gerando} onClick={handleGenerateCertificate} className=" click px-3 py-1 flex gap-2 text-yellow-500 border-2 border-yellow-500 text-sm rounded-md">
                                            {
                                                gerando ?
                                                    <>
                                                        <FaSpinner className='animate-spin my-auto' />
                                                        <span> Gerando...  </span>
                                                    </>
                                                    : 'Gerar Certificado'
                                            }
                                        </button>
                                }


                            </div>
                        )}


                        <div className="mt-4 py-0 bg-white dark:bg-slate-100/10 rounded-lg">
                            <div className="mt-0">

                                {
                                    /** 
                                        <h3 className="text-xl font-bold dark:text-white">Progresso do Estudante</h3>
                           
                                    <p className="text-lg dark:text-white">
                                        {`Lições concluídas: ${completedCount} / ${totalLessons}`}
                                    </p>


                                     <div className="w-full h-3 bg-gray-300 rounded-md overflow-hidden mt-2">
                                        <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
                                    </div>
                                     <p className="mt-1 text-sm dark:text-white">{`${progress}% concluído`}</p>
    
                                     */
                                }
                            </div>
                        </div>
                        {currentLesson ? (
                            <>
                                <ReactPlayer url={currentLesson.videoLink} controls width="100%" />
                                <br />
                                <h3 className="mt-4 text-xl dark:text-white">{currentLesson.title}</h3>
                                <br />
                                <button
                                    className={`mt-4 px-4 py-1 rounded-md text-xl flex items-center ${completedLessons.includes(currentLesson.id) ? 'bg-green-500 text-white' : ' bg-primary  text-white-500'}`}
                                    onClick={handleCompleteLesson}
                                    disabled={completedLessons.includes(currentLesson.id)}
                                >
                                    <FaCheckCircle className="mr-2 text-sm" />
                                    <span className='text-sm'>{completedLessons.includes(currentLesson.id) ? 'Aula Concluída' : 'Concluir Aula'}</span>
                                </button>
                                <br />
                                <br />
                                {
                                    /*
     <CommentSection user={currentUser} courseId={course?.id} lessonId={currentLesson.id} />
                                    */
                                }
                            </>
                        )
                            :

                            <div>
                                <img src={course?.cover} alt={course?.title} />
                                <br />
                                <h2 className="text-2xl dark:text-white font-semibold">
                                    Navegue entre os as aulas clicando em Módulo
                                </h2>
                                <br />
                                <br />

                            </div>

                        }
                    </div>
                    <div className="w-5/12 px-4 py-3 bg-white dark:bg-slate-100/10 dark:text-white rounded-md">
                        <TabsComponent tabs={tabs} />
                    </div>
                </div>
            </div>
        </div>
    );
};
