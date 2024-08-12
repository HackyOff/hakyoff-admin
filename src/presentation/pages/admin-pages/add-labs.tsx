// AddLabForm.tsx
import { db } from '@/domain/config/firebase';
import { RANDOM_CODE_10, RandomAlphanumeric } from '@/domain/config/navbar-config';
import { IMLab } from '@/domain/models/labs-model';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import { ITraining } from '@/interfaces/training/training';
import { fetchAllCourses } from '@/services/fetch-courses-service';
import React, { useEffect, useMemo, useState } from 'react';

export const AddLabForm: React.FC = () => {
    const [lab, setLab] = useState<Omit<IMLab, 'challenges'> & { challenges: ICtfsChallenge[] }>({
        lab_id: RANDOM_CODE_10,
        course_id: '',
        lab_name: '',
        course_name: '',
        challenges: [],
    });


    const handleLabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLab((prevLab) => ({
            ...prevLab,
            [name]: value,
        }));
    };


    const handleLabChangeSelect = (courseId: string) => {

        const selectedCourse = courses.find((course) => course.id === courseId);
        if (selectedCourse) {
            setLab((prevLab) => ({
                ...prevLab,
                course_id: selectedCourse?.id ? selectedCourse?.id : '',
                course_name: selectedCourse.title,
            }));
        }
    };


    const handleChallengeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const challenges = [...lab.challenges];
        challenges[index] = { ...challenges[index], [name]: value };
        setLab((prevLab) => ({
            ...prevLab,
            challenges,
        }));
    };

    const addChallenge = () => {
        setLab((prevLab) => ({
            ...prevLab,
            challenges: [...prevLab.challenges, { id: RandomAlphanumeric(7), title: '', desc: '', level: 'Beginner', pts: 0, link: '', flag: '', }],
        }));
    };

    const removeChallenge = (index: number) => {
        const challenges = [...lab.challenges];
        challenges.splice(index, 1);
        setLab((prevLab) => ({
            ...prevLab,
            challenges,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await db.collection('labs').add(lab);
            setLab({
                lab_id: 0,
                course_id: '',
                lab_name: '',
                course_name: '',
                challenges: [],
            });
            alert('Lab adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar lab: ', error);
            alert('Erro ao adicionar lab');
        }
    };

    const [courses, setCourses] = useState<ITraining[]>([]);

    const getCoursesMemo = useMemo(() => {
        return async () => {
            try {
                const courses = await fetchAllCourses();
                setCourses(courses);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };
    }, []);


    useEffect(() => {
        getCoursesMemo();
    }, [getCoursesMemo]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:w-6/12 form-lab">
            <div className="flex w-full gap-6 flex-column sm:flex-row">
                <div className="flex flex-col w-full">
                    <label className="mb-1">Lab ID:</label>
                    <input
                        name="lab_id"
                        type="number"
                        disabled
                        value={lab.lab_id}
                        onChange={handleLabChange}
                        className="p-2 border border-gray-500 rounded disabled:bg-slate-100"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-1">Course ID:</label>
                    <input
                        name="course_id"
                        type="text"
                        disabled
                        value={lab.course_id}
                        className="p-2 border border-gray-500 rounded disabled:bg-slate-100"
                    />
                </div>
            </div>
            <div className="flex w-full gap-6 flex-column sm:flex-row">
                <div className="flex flex-col w-full">
                    <label className="mb-1">Selecionar Curso</label>
                    <select
                        className='p-2 outline-none'
                        onChange={(e) => handleLabChangeSelect(e.target.value)}
                        name=""
                        id=""
                    >
                        <option value="">Selecionar</option>
                        {
                            courses.map((course, i) => (
                                <option key={i} value={course.id}>{course.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-1">Lab Name:</label>
                    <input
                        name="lab_name"
                        type="text"
                        value={lab.lab_name}
                        onChange={handleLabChange}
                        className="p-2 border rounded"
                    />
                </div>
            </div>


            <div>
                <h3 className="text-lg font-semibold">Desafios:</h3>
                <br />
                {lab.challenges.map((challenge, index) => (
                    <div key={index} className="grid gap-5 p-4 mb-2 space-y-2 border rounded sm:grid-cols-2">

                        <div className="flex flex-col">
                            <label className="mb-1">Titulo:</label>
                            <input
                                name="title"
                                type="text"
                                value={challenge.title}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="p-2 border rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1">Flag Correta:</label>
                            <input
                                name="flag"
                                type="text"
                                value={challenge.flag}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="p-2 border rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1">Link do lab:</label>
                            <input
                                name="link"
                                type="link"
                                value={challenge.link}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Descrição:</label>
                            <textarea
                                name="desc"
                                value={challenge.desc}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="p-2 border rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1">Level:</label>

                            <select name="level"
                                value={challenge.level}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="w-full p-2 border rounded"
                            >

                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>

                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1">Points:</label>
                            <input
                                name="pts"
                                type="number"
                                value={challenge.pts}
                                onChange={(e) => handleChallengeChange(index, e)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button type="button" onClick={() => removeChallenge(index)} className="p-2 mt-6 text-white bg-red-600 rounded me-auto m">Remove Challenge</button>
                    </div>
                ))}
                <br />
                <br />
                <button type="button" onClick={addChallenge} className="p-2 font-semibold text-black rounded bg-primary">Add Desafio</button>
            </div>

            <button type="submit" className="p-2 text-white bg-green-500 rounded">Adicionar Lab</button>
            <br /><br /><br />
        </form >
    );
};
