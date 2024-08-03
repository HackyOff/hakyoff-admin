import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore'; // Importe getDocs para consultar a coleção
import { ITrainer } from '@/interfaces/trainer/trainer';
import { db } from '@/domain/config/firebase';
import firebase from 'firebase/compat/app';
import { AlertUtils } from '@/utils/alert-utils';

interface AddTrainerProps { }

const AddTrainerPage: React.FC<AddTrainerProps> = () => {
    const [trainerName, setTrainerName] = useState('');
    const [trainerRole, setTrainerRole] = useState('');
    const [trainerPicture, setTrainerPicture] = useState<File | null>(null); // Armazena o arquivo de imagem
    const [trainerPictureUrl, setTrainerPictureUrl] = useState<string>(''); // URL da imagem do formador
    const [trainers, setTrainers] = useState<ITrainer[]>([]); // Lista de formadores

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const trainersCollection = collection(db, 'trainers');
            const snapshot = await getDocs(trainersCollection); // Corrigido para usar getDocs
            const trainersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as ITrainer }));
            setTrainers(trainersData);
        } catch (error) {
            console.error('Erro ao buscar formadores:', error);
        }
    };

    const handleAddTrainer = async () => {
        if (!trainerName || !trainerRole || !trainerPicture) {
            AlertUtils.error('Preencha os dados do Formador ')
            return
        }
        try {
            let imageUrl = ''; // URL da imagem a ser salva no Firestore

            // Realiza o upload da imagem se estiver presente
            if (trainerPicture) {
                const storageRef = firebase.storage().ref(); // Corrigido para acessar ref() diretamente
                const imageRef = storageRef.child(`trainer_images/${trainerPicture.name}`);
                await imageRef.put(trainerPicture);
                imageUrl = await imageRef.getDownloadURL();
            }

            // Adicionar formador ao Firestore
            await addDoc(collection(db, 'trainers'), {
                name: trainerName,
                role: trainerRole,
                picture: imageUrl,
            });

            console.log('Formador adicionado com sucesso.');
            AlertUtils.success('Formador adicionado com sucesso.');

            // Limpar campos após adicionar o formador
            setTrainerName('');
            setTrainerRole('');
            setTrainerPicture(null);
            setTrainerPictureUrl('');

            // Atualizar lista de formadores
            fetchTrainers();
        } catch (error: any) {
            AlertUtils.success('Erro ao adicionar formador: ', error.message)
            console.error('Erro ao adicionar formador: ', error);
        }
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setTrainerPicture(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setTrainerPictureUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Adicionar Formador</h1>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-gray-700">Nome do Formador:</span>
                        <input
                            type="text"
                            value={trainerName}
                            onChange={(e) => setTrainerName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Cargo do Formador:</span>
                        <input
                            type="text"
                            value={trainerRole}
                            onChange={(e) => setTrainerRole(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Foto do Formador:</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {trainerPictureUrl && (
                            <img src={trainerPictureUrl} alt="Preview" className="mt-2 rounded-md shadow-sm" style={{ maxWidth: '100%' }} />
                        )}
                    </label>
                </div>

                <button onClick={handleAddTrainer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Adicionar Formador
                </button>
            </form>

            <hr className="my-8" />

            <div>
                <h2 className="text-2xl font-bold mb-4">Lista de Formadores</h2>
                <ul className="space-y-4">
                    {trainers.map(trainer => (
                        <li key={trainer.id} className="border gap-6 flex p-4 rounded-md shadow-sm">
                            {trainer.picture && (
                                <img src={trainer.picture} alt={trainer.name} className="mt-2 rounded-md w-16 shadow-sm" style={{ maxWidth: '100px' }} />
                            )}
                            <div className='text-2xl my-auto '>
                                <p className="font-bold">{trainer.name}</p>
                                <p className="text-gray-600">{trainer.role}</p>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddTrainerPage;
