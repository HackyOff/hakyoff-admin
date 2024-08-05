// courseData.ts

import { icons, svgs } from '@/utils/image-exporter';
import { formatMoney } from '@/utils/formatToMoney';
import { CourseDetailsTime, TeacherAvatarComponent } from '@/presentation/components';
import { ITraining, Lesson, Material, Module } from '@/interfaces/training/training';
import { BenefitsList } from '@/presentation/components/dashboard-components/benefits-details-list/benefits-list';
import { useEffect, useState } from 'react';
import { db } from '@/domain/config/firebase';
import { getFileIcon, getFileNameFromUrl } from './fileIcons-utils';
import { FaDownload } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { FaAngleDown, FaCheckCircle, FaCheckSquare } from 'react-icons/fa';
import { abbreviateText } from './abreviate';
import { DateUtils } from './dateutils';



export const useCourseModules = (courseId: string | null): Module[] | null => {
    const [modules, setModules] = useState<Module[] | null>(null);

    useEffect(() => {
        if (!courseId) {
            setModules(null);
            return;
        }

        async function fetchModulesAndLessons() {
            try {
                const modulesSnapshot = await db.collection('modules').where('courseId', '==', courseId).get();
                const modulesData = modulesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Module[];

                const modulesWithLessonsPromises = modulesData.map(async (module) => {
                    const lessonsSnapshot = await db.collection('lessons').where('moduleId', '==', module.id).get();
                    const lessonsData = lessonsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Lesson[];

                    return {
                        ...module,
                        lessons: lessonsData,
                    };
                });

                const modulesWithLessons = await Promise.all(modulesWithLessonsPromises);

                setModules(modulesWithLessons);
            } catch (error) {
                console.error('Erro ao buscar módulos e aulas:', error);
                setModules(null);
            }
        }

        fetchModulesAndLessons();
    }, [courseId]);

    return modules;
};


export const useCourseMaterials = (courseId: string | null): Material[] | null => {
    const [materials, setMaterials] = useState<Material[] | null>(null);

    useEffect(() => {
        if (!courseId) {
            setMaterials(null);
            return;
        }

        async function fetchMaterials() {
            try {
                const materialsSnapshot = await db.collection('materials').where('courseId', '==', courseId).get();
                const materialsData = materialsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    fileUrl: doc.data().fileUrl,
                })) as Material[];

                setMaterials(materialsData);
            } catch (error) {
                console.error('Erro ao buscar materiais:', error);
                setMaterials(null);
            }
        }

        fetchMaterials();
    }, [courseId]);

    return materials;
};


export const getTabs = (course: ITraining | null, modules: Module[] | null, materials: Material[] | null) => {
    const [openModuleId, setOpenModuleId] = useState<string | null>(null);

    if (!course) {
        return [];
    }

    const toggleModule = (moduleId: string) => {
        setOpenModuleId(openModuleId === moduleId ? null : moduleId);
    };

    return [
        {
            label: "Sobre",
            content: (
                <>
                    <div className="mb-4">
                        <h2 className="text-4xl font-bold hacker">
                            {formatMoney(course?.price || 0)}
                        </h2>
                        <CourseDetailsTime
                            className="font-bold mb-4 text-yellow-800"
                            hours={course?.hours || 0}
                            students={course?.students || 0}
                            studentsIcon={icons.people}
                            timeIcon={icons.time}
                        />
                        <b className="text-xl hacker">Detalhes</b>
                        <hr />
                        <br />
                        <p className="pl-3 border-l-2">{course?.description}</p>
                        <br />
                        <br />
                        <b className="text-xl hacker">Sobre o formador</b>
                        <hr />
                        <TeacherAvatarComponent
                            name={course!.trainer.name}
                            picture={course!.trainer.picture}
                            role={course!.trainer.role}
                        />
                        <br />

                        <b>Benefícios</b>
                        <ul className='mt-4'>
                            {course.benefits?.map((b, i) => (
                                <BenefitsList key={i} benefits={b} />
                            ))}
                        </ul>
                    </div>
                </>
            ),
        },
        {
            label: "Módulos",
            content: (
                <div>
                    <p className="mb-2 hacker mt-3">Módulos do Treinamento</p>
                    <hr />
                    {modules?.map(module => (
                        <div key={module.id}>
                            <motion.button
                                onClick={() => toggleModule(module.id)}
                                className={`accordion-button ps-10 relative dark:text-white/80 flex justify-between ${openModuleId === module.id ? ' text-black bg-primary/50 font-semibold' : 'text-dark hover:bg-slate-200/30 bg-slate-200/10 '}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img src={svgs.module_svg} className='w-7 absolute text-white left-2 my-auto' alt="" />
                                {module.title}
                                <FaAngleDown className={`${openModuleId === module.id && 'text-yellow-700 rotate-180'} transiction-all my-auto`} />
                            </motion.button>
                            <motion.div
                                initial={false}
                                animate={{ height: openModuleId === module.id ? 'auto' : 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <ul className="accordion-content bg-slate-100/50">
                                    {module.lessons.map(lesson => (
                                        <motion.li
                                            key={lesson.id}
                                            className='border-b hover:bg-primary/5 py-2 flex gap-2'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <img src={svgs.play_svg} className='my-auto w-5 text-primary' />
                                            <span className="hacker">{lesson.title}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            label: "Material",
            content: (
                <div>
                    <p className="mb-3 mt-4 hacker">Materiais do Treinamento</p>
                    <hr />
                    <ul>
                        {materials?.map(material => {
                            const fileName = getFileNameFromUrl(material.fileUrl);
                            const Icon = getFileIcon(fileName);
                            return (
                                <li key={material.id} className="flex py-3 px-2 hover:bg-primary/10 items-center">
                                    <Icon className="w-6 text-yellow-700 h-6 mr-2" />
                                    <span>{abbreviateText(fileName, 25)}</span>
                                    <span className="ms-auto">
                                        <FaDownload className='my-auto text-slate-400' />
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ),
        },
    ];
};

export const getTabsMyCourse = (course: ITraining | null, modules: Module[] | null, materials: Material[] | null, setCurrentLesson: (lesson: Lesson) => void, completedLessons: string[]) => {
    const [openModuleId, setOpenModuleId] = useState<string | null>(null);

    if (!course) {
        return [];
    }

    const toggleModule = (moduleId: string) => {
        setOpenModuleId(openModuleId === moduleId ? null : moduleId);
    };

    const allLessonsCompleted = (lessons: Lesson[]): boolean => {
        return lessons.every(lesson => completedLessons.includes(lesson.id));
    };

    const isLessonLocked = (moduleIndex: number, lessonIndex: number): boolean => {
        // Verificar se é a primeira aula do primeiro módulo
        if (moduleIndex === 0 && lessonIndex === 0) {
            return false;
        }

        // Verificar se todas as aulas anteriores em todos os módulos anteriores foram concluídas
        for (let mIndex = 0; mIndex <= moduleIndex; mIndex++) {
            const currentModule = modules![mIndex];
            for (let lIndex = 0; lIndex < (mIndex === moduleIndex ? lessonIndex : currentModule.lessons.length); lIndex++) {
                const lesson = currentModule.lessons[lIndex];
                if (!completedLessons.includes(lesson.id)) {
                    return true;
                }
            }
        }
        return false;
    };

    return [
        {
            label: "Módulos",
            content: (
                <div>
                    <p className="mb-2 hacker mt-3">Módulos do Treinamento</p>
                    <hr />
                    {modules?.map((module, moduleIndex) => (
                        <div key={module.id}>
                            <motion.button
                                onClick={() => toggleModule(module.id)}
                                className={`accordion-button ps-10 relative dark:text-white/80 flex justify-between ${openModuleId === module.id ? 'text-black bg-primary/50 font-semibold' : 'text-dark hover:bg-slate-200/30 bg-slate-200/10 '}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className='w-7 absolute text-white hidden dark:block left-2 my-auto' viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
                                    <title>diagram-module-library dark</title>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Combined-Shape" fill="#ffffff" transform="translate(64.000000, 64.000000)">
                                            <path d="M341.333333,234.666667 L362.666667,256 L362.666667,405.333333 L213.333333,405.333333 L192,384 L192,234.666667 L341.333333,234.666667 Z M320,256 L213.333333,256 L213.333333,362.666667 L320,362.666667 L320,256 Z M256,277.333333 L256,285.866667 L268.8,285.866667 L268.8,328.532667 L277.333333,328.533333 L277.333333,320 L298.666667,320 L298.666667,341.333333 L277.333333,341.333333 L277.333333,332.8 L256,332.8 L256,341.333333 L234.666667,341.333333 L234.666667,320 L256,320 L256,328.533333 L264.533,328.532667 L264.533,290.132667 L256,290.133333 L256,298.666667 L234.666667,298.666667 L234.666667,277.333333 L256,277.333333 Z M170.666,234.666 L170.666,277.333 L0,277.333333 L0,234.666667 L170.666,234.666 Z M260.235865,25.8387255 L298.594622,213.333333 L243.11,213.333 L209.813708,36.9522088 L260.235865,25.8387255 Z M64,0 L64,213.333333 L21.3333333,213.333333 L21.3333333,0 L64,0 Z M128,21.3333333 L128,213.333333 L85.3333333,213.333333 L85.3333333,21.3333333 L128,21.3333333 Z M192,21.3333333 L192,213.333333 L149.333333,213.333333 L149.333333,21.3333333 L192,21.3333333 Z">

                                            </path>
                                        </g>
                                    </g>
                                </svg>


                                <svg className='w-7 dark:hidden absolute text-white left-2 my-auto' viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
                                    <title>diagram-module-library  for light mode</title>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Combined-Shape" fill="#000000" transform="translate(64.000000, 64.000000)">
                                            <path d="M341.333333,234.666667 L362.666667,256 L362.666667,405.333333 L213.333333,405.333333 L192,384 L192,234.666667 L341.333333,234.666667 Z M320,256 L213.333333,256 L213.333333,362.666667 L320,362.666667 L320,256 Z M256,277.333333 L256,285.866667 L268.8,285.866667 L268.8,328.532667 L277.333333,328.533333 L277.333333,320 L298.666667,320 L298.666667,341.333333 L277.333333,341.333333 L277.333333,332.8 L256,332.8 L256,341.333333 L234.666667,341.333333 L234.666667,320 L256,320 L256,328.533333 L264.533,328.532667 L264.533,290.132667 L256,290.133333 L256,298.666667 L234.666667,298.666667 L234.666667,277.333333 L256,277.333333 Z M170.666,234.666 L170.666,277.333 L0,277.333333 L0,234.666667 L170.666,234.666 Z M260.235865,25.8387255 L298.594622,213.333333 L243.11,213.333 L209.813708,36.9522088 L260.235865,25.8387255 Z M64,0 L64,213.333333 L21.3333333,213.333333 L21.3333333,0 L64,0 Z M128,21.3333333 L128,213.333333 L85.3333333,213.333333 L85.3333333,21.3333333 L128,21.3333333 Z M192,21.3333333 L192,213.333333 L149.333333,213.333333 L149.333333,21.3333333 L192,21.3333333 Z">

                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                {module.title}
                                <FaAngleDown className={`${openModuleId === module.id && 'text-yellow-7000 rotate-180'} ms-auto me-2 transition-all my-auto`} />
                                {allLessonsCompleted(module.lessons) && <FaCheckSquare className='text-green-500 my-auto' />}
                            </motion.button>
                            <motion.div
                                initial={false}
                                animate={{ height: openModuleId === module.id ? 'auto' : 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <ul className="accordion-content bg-slate-100/50 dark:bg-slate-100/10">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <motion.li
                                            title={isLessonLocked(moduleIndex, lessonIndex) ? 'Conclua a aula anterior' : ''}
                                            key={lesson.id}
                                            className={`border-b  py-2 flex gap-2 ${isLessonLocked(moduleIndex, lessonIndex) ? 'opacity-[.01] cursor-not-allowed bg-slate-100 px-1' : 'hover:bg-primary/5 cursor-pointer '}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: lessonIndex * 0.1 }}
                                            onClick={() => {
                                                if (!isLessonLocked(moduleIndex, lessonIndex)) {
                                                    setCurrentLesson(lesson);
                                                }
                                            }}
                                        >
                                            <span className={`text-sm ${isLessonLocked(moduleIndex, lessonIndex) ? 'text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                                                {lesson.title}
                                            </span>
                                            {completedLessons.includes(lesson.id) && <FaCheckCircle className="text-green-500 ml-2" />}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            label: "Materiais",
            content: (
                <div>
                    <p className="mb-2 hacker mt-3">Materiais do Treinamento</p>
                    <hr />
                    <ul className="py-2 flex flex-col gap-2">

                        {materials?.map(material => {
                            const fileName = getFileNameFromUrl(material.fileUrl);
                            const Icon = getFileIcon(fileName);

                            function handleDownload(url: string) {
                                const fileName1 = url.split('/').pop();
                                const fileName = fileName1?.split('token')[0]

                                fetch(url).then((response) => {
                                    response.blob().then((blob) => {
                                        const fileURL = window.URL.createObjectURL(blob);
                                        let alink = document.createElement("a");
                                        alink.href = fileURL;
                                        alink.download = fileName + DateUtils.formatDateTimeToPTT(new Date()) + ".pdf";
                                        alink.click();
                                    });
                                });
                            }




                            return (
                                <li key={material.id} className="flex py-3 px-2 hover:bg-primary/10 items-center">
                                    <Icon className="w-6 text-yellow-700 h-6 mr-2" />
                                    <span>{abbreviateText(fileName, 25)}</span>
                                    <span className="ms-auto">
                                        <FaDownload onClick={() => handleDownload(material.fileUrl)} className='my-auto text-slate-800 dark:text-white cursor-pointer' />
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
        }
    ];
};



