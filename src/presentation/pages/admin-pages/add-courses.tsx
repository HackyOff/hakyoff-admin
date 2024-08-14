import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/domain/config/firebase';
import { ITrainer } from '@/interfaces/trainer/trainer';
import { Module, Lesson, Material, ITBenefits } from '@/interfaces/training/training';
import { AlertUtils } from '@/utils/alert-utils';
import { ROUTE_TRAINERS } from '@/utils/sidebar-utils';

interface AddCourseProps { }

export const AddCoursePage: React.FC<AddCourseProps> = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState<number>(0);
  const [status, setStatus] = useState<'Brevemente' | 'Disponível'>('Disponível');
  const [courseHours, setCourseHours] = useState<number>(0);
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);
  const [courseCover, setCourseCover] = useState<File | null>(null);
  const [trainers, setTrainers] = useState<ITrainer[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [benefits, setBenefits] = useState<ITBenefits>({
    lab: false,
    material: false,
    lessons: false,
    exam: false,
    support: false,
  });


  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersCollection = collection(db, 'trainers');
        const trainersSnapshot = await getDocs(trainersCollection);
        const trainersList: ITrainer[] = trainersSnapshot.docs.map(doc => doc.data() as ITrainer);
        setTrainers(trainersList);
      } catch (error) {
        console.error('Erro ao buscar formadores:', error);
      }
    };

    fetchTrainers();
  }, []);

  const handleAddCourse = async () => {
    try {
      if (!courseTitle || !coursePrice || !courseDescription || !courseCover) {
        AlertUtils.error('Preencha todas as informações antes de adicionar o curso.');
        return;
      }

      const courseCoverRef = ref(storage, `courses/covers/${courseCover.name}`);
      const courseCoverSnapshot = await uploadBytes(courseCoverRef, courseCover);
      const courseCoverUrl = await getDownloadURL(courseCoverSnapshot.ref);

      const courseRef = await addDoc(collection(db, 'courses'), {
        title: courseTitle,
        description: courseDescription,
        price: coursePrice,
        hours: courseHours,
        trainer: selectedTrainer,
        coverUrl: courseCoverUrl,
        status: status,
        benefits: benefits,
        destaque: false
      });

      const courseId = courseRef.id;

      for (const module of modules) {
        const moduleRef = await addDoc(collection(db, 'modules'), {
          courseId: courseId,
          title: module.title,
        });

        const moduleId = moduleRef.id;

        for (const lesson of module.lessons) {
          const lessonVideoRef = ref(storage, `courses/${courseId}/lessons/${lesson.videoFile?.name}`);
          const lessonVideoSnapshot = await uploadBytes(lessonVideoRef, lesson.videoFile!);
          const lessonVideoUrl = await getDownloadURL(lessonVideoSnapshot.ref);

          await addDoc(collection(db, 'lessons'), {
            moduleId: moduleId,
            title: lesson.title,
            videoLink: lessonVideoUrl,
          });
        }

        for (const material of module.materials) {
          await addDoc(collection(db, 'materials'), {
            moduleId: moduleId,
            title: material.title,
            fileUrl: material.fileUrl,
          });
        }
      }

      AlertUtils.success('Treinamento adicionado com sucesso');

      setCourseTitle('');
      setCourseDescription('');
      setCoursePrice(0);
      setCourseHours(0);
      setSelectedTrainer(null);
      setCourseCover(null);
      setModules([]);
    } catch (error) {
      console.error('Erro ao adicionar Treinamento: ', error);
    }
  };

  const handleAddModule = () => {
    const newModule: Module = {
      id: '',
      title: '',
      lessons: [],
      materials: [],
    };
    setModules([...modules, newModule]);
  };

  const handleAddLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: '',
      moduleId: moduleId,
      title: '',
      videoLink: '',
      videoFile: null,
    };
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [...module.lessons, newLesson],
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleAddMaterial = (moduleId: string) => {
    const newMaterial: Material = {
      id: '',
      moduleId: moduleId,
      title: '',
      fileUrl: '',
    };
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          materials: [...module.materials, newMaterial],
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  return (
    <div className="max-w-4xl p-8 mt-10 bg-white">
      <h1 className="mb-4 text-3xl font-bold">Adicionar Treinamento com Módulos, Aulas e Materiais</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 form-ad-c">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Título do Treinamento:</span>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Descrição do Treinamento:</span>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Preço do Treinamento:</span>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Horas do Treinamento:</span>
            <input
              type="number"
              value={courseHours}
              onChange={(e) => setCourseHours(Number(e.target.value))}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700">Status / Disponibilidade:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Brevemente' | 'Disponível')}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecione um status</option>
              <option value="Brevemente">Brevemente</option>
              <option value="Disponível">Disponível</option>
            </select>
          </label>
          <div>
            <label className="block mt-4">
              <span className="text-gray-700">Instrutor:</span>
              <select
                value={selectedTrainer?.name} // Define o value como selectedTrainer?.id
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const selected = trainers.find(trainer => trainer.name === selectedName) || null;
                  setSelectedTrainer(selected); // Atualiza o estado com o instrutor selecionado
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione um instrutor</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option> // Valor é o ID do instrutor
                ))}
              </select>
            </label>
            <span className="text-sm text-gray-500">Não encontrou o formador deste curso ? <a href={ROUTE_TRAINERS} className="text-blue-600 underline">adicione aqui</a></span>
          </div>
          <label className="block">
            <br />
            <span className="text-gray-700">Capa do Treinamento:</span>
            <input
              type="file"
              onChange={(e) => setCourseCover(e.target.files ? e.target.files[0] : null)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <br />

          <fieldset className="block mt-4">
            <legend className="text-gray-700">Benefícios do Treinamento:</legend>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={benefits.lab}
                  onChange={(e) => setBenefits({ ...benefits, lab: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 form-checkbox"
                />
                <span className="text-gray-700">Laboratório prático</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={benefits.material}
                  onChange={(e) => setBenefits({ ...benefits, material: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 form-checkbox"
                />
                <span className="text-gray-700">Material didático</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={benefits.lessons}
                  onChange={(e) => setBenefits({ ...benefits, lessons: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 form-checkbox"
                />
                <span className="text-gray-700">Aulas gravadas</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={benefits.exam}
                  onChange={(e) => setBenefits({ ...benefits, exam: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 form-checkbox"
                />
                <span className="text-gray-700">Exame ao final do Treinamento</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={benefits.support}
                  onChange={(e) => setBenefits({ ...benefits, support: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 form-checkbox"
                />
                <span className="text-gray-700">Suporte contínuo</span>
              </label>
            </div>
          </fieldset>
        </div>

        <button onClick={handleAddCourse} className="px-4 py-2 font-bold rounded bg-primary hover:bg-blue-700">
          Adicionar Curso
        </button>

      </form>

      <hr className="my-8" />

      <div>
        <h2 className="mb-4 text-2xl font-bold">Adicionar Módulos, Aulas e Materiais</h2>
        <button onClick={handleAddModule} className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
          Adicionar Módulo
        </button>

        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="p-4 mt-4 border rounded-md shadow-sm">
            <h3 className="mb-2 text-xl font-bold">Módulo {moduleIndex + 1}</h3>

            <label className="block mt-2">
              <span className="text-gray-700">Título do Módulo:</span>
              <input
                type="text"
                value={module.title}
                onChange={(e) => {
                  const updatedModules = [...modules];
                  updatedModules[moduleIndex].title = e.target.value;
                  setModules(updatedModules);
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <div className="mt-4">
              <button onClick={() => handleAddLesson(module.id)} className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700">
                Adicionar Aula
              </button>

              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="p-4 mt-4 border rounded-md shadow-sm form-mat">
                  <h4 className="mb-2 text-lg font-bold">Aula {lessonIndex + 1}</h4>

                  <label className="block mt-2">
                    <span className="text-gray-700">Título da Aula:</span>
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                        setModules(updatedModules);
                      }}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block mt-2">
                    <span className="text-gray-700">Vídeo da Aula:</span>
                    <input
                      type="file"
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[moduleIndex].lessons[lessonIndex].videoFile = e.target.files ? e.target.files[0] : null;
                        setModules(updatedModules);
                      }}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button onClick={() => handleAddMaterial(module.id)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                Adicionar Material
              </button>

              {module.materials.map((material, materialIndex) => (
                <div key={materialIndex} className="p-4 mt-4 border rounded-md shadow-sm form-mat">
                  <h4 className="mb-2 text-lg font-bold">Material {materialIndex + 1}</h4>

                  <label className="block mt-2">
                    <span className="text-gray-700">Título do Material:</span>
                    <input
                      type="text"
                      value={material.title}
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[moduleIndex].materials[materialIndex].title = e.target.value;
                        setModules(updatedModules);
                      }}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>

                  <label className="block mt-2">
                    <span className="text-gray-700">Arquivo do Material:</span>
                    <input
                      type="file"
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          const materialFileRef = ref(storage, `courses/${courseTitle}/materials/${file.name}`);
                          uploadBytes(materialFileRef, file).then(async snapshot => {
                            const fileUrl = await getDownloadURL(snapshot.ref);
                            updatedModules[moduleIndex].materials[materialIndex].fileUrl = fileUrl;
                            setModules(updatedModules);
                          });
                        }
                      }}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
