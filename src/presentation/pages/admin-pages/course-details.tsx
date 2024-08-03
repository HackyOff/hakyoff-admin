// components/CourseDetailComponent.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITraining, Lesson, Material } from '@/interfaces/training/training';
import { fetchCourseDetails } from '@/services/courseServices';

const CourseDetailComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<ITraining | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { course, lessons, materials } = await fetchCourseDetails(id ? id : '');
                setCourse(course);
                setLessons(lessons);
                setMaterials(materials);
            } catch (error) {
                console.error('Erro ao buscar detalhes do Treinamento:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!course) {
        return <p>Treinamento não encontrado.</p>;
    }

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p>Instrutor: {course.trainer?.name}</p>
            <p>Preço: {course.price}</p>
            <p>Status: {course.status}</p>

            <h2>Aulas</h2>
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.id}>
                        <h3>{lesson.title}</h3>
                        <a href={lesson.videoLink} target="_blank" rel="noopener noreferrer">Assistir</a>
                    </li>
                ))}
            </ul>

            <h2>Materiais</h2>
            <ul>
                {materials.map(material => (
                    <li key={material.id}>
                        <h3>{material.title}</h3>
                        <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">Baixar</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseDetailComponent;
