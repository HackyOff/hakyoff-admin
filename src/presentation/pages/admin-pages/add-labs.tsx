// AddLabForm.tsx
import { db } from '@/domain/config/firebase';
import {  RandomAlphanumeric } from '@/domain/config/navbar-config';
import { IMLab } from '@/domain/models/labs-model';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import React, { useState } from 'react';

export const AddLabForm: React.FC = () => {
    const [lab, setLab] = useState<Omit<IMLab, 'challenges'> & { challenges: ICtfsChallenge[] }>({
        lab_id: 0,
        course_id: 0,
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
                course_id: 0,
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

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label className="mb-1">Lab ID:</label>
                <input
                    name="lab_id"
                    type="number"
                    value={lab.lab_id}
                    onChange={handleLabChange}
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1">Course ID:</label>
                <input
                    name="course_id"
                    type="number"
                    value={lab.course_id}
                    onChange={handleLabChange}
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1">Lab Name:</label>
                <input
                    name="lab_name"
                    type="text"
                    value={lab.lab_name}
                    onChange={handleLabChange}
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1">Course Name:</label>
                <input
                    name="course_name"
                    type="text"
                    value={lab.course_name}
                    onChange={handleLabChange}
                    className="p-2 border rounded"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold">Challenges:</h3>
                {lab.challenges.map((challenge, index) => (
                    <div key={index} className="p-4 mb-2 space-y-2 border rounded">
                        <div className="flex flex-col">
                            <label className="mb-1">Title:</label>
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
                            <label className="mb-1">Description:</label>
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
                        <button type="button" onClick={() => removeChallenge(index)} className="p-2 mt-2 text-white bg-red-500 rounded">Remove Challenge</button>
                    </div>
                ))}
                <button type="button" onClick={addChallenge} className="p-2 text-white bg-blue-500 rounded">Add Challenge</button>
            </div>

            <button type="submit" className="p-2 text-white bg-green-500 rounded">Adicionar Lab</button>
        </form >
    );
};
