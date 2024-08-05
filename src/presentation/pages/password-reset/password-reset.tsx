/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { logos } from '@/utils/image-exporter';
import { Button } from '@/presentation/components';
import { ROUTE_LOGIN } from '@/utils/sidebar-utils';
import { LoaderText } from '@/presentation/components/dashboard-components/loader-text/loader-text';

export const PasswordResetRequest: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);

    const handlePasswordReset = async () => {
        setLoad(true);
        const auth = getAuth();
        const db = getFirestore();
        //console.log('Email fornecido:', email);  // Log para depuração

        try {
            // Verificar se o e-mail existe na coleção 'admins'
            const userRef = collection(db, 'admins');
            const q = query(userRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // E-mail não encontrado na coleção 'admins'
                setMessage('');
                setError('O e-mail fornecido não foi encontrado.');
            } else {
                // E-mail encontrado, enviar o e-mail de redefinição de senha
                await sendPasswordResetEmail(auth, email);
                setMessage('Email de redefinição de senha enviado. Verifique sua caixa de entrada.');
                setError('');
                setEmail('');
            }
        } catch (error: any) {
            // console.log('Error:', error);  // Log para depuração
            setMessage('');
            setError('Erro ao enviar email de redefinição de senha: ' + error.message);
        } finally {
            setLoad(false);
            setTimeout(() => {
                setError('');
            }, 7000);
        }
    };

    return (
        <div className="grid items-center h-screen bg-black place-content-center password-reset-request">
            <div className='px-6 w-[24rem] text-center py-10 border rounded-md border-slate-300/50 bg-transparent'>
                <center>
                    <img src={logos.logo_2} className="w-[8rem] 2xl:w-[12rem] 2xl:mb-4" alt="" />
                    <h1 className="text-xl font-bold text-white sm:text-2xl glitch hacker" data-text='Recuperar senha'>
                        Recuperar senha
                    </h1>
                </center>
                <br />
                <div className="flex flex-col mb-3">
                    <input
                        type="email"
                        autoComplete='false'
                        className="px-3 mx-auto py-2 w-[20rem] text-white bg-transparent border-2 rounded-md outline-none focus-within:border-primary"
                        name="email"
                        id="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <center>
                    {load ? (
                        <LoaderText className='mx-auto text-white' text='Enviando link.' />
                    ) : (
                        <Button onClick={handlePasswordReset} color='primary' className='mx-auto mt-8 text-sm' text='Enviar Email de Redefinição' />
                    )}
                </center>

                <center className='mt-2'>
                    <span onClick={() => window.location.href = ROUTE_LOGIN} className="text-xs cursor-pointer hover:underline text-primary">Sei a senha, Entrar!</span><br />
                </center>
                <div className="d">
                    {message && (
                        <div className="px-2 mx-auto mt-3 py-1 text-sm bg-green-500/30 w-[18rem] text-center">
                            <p className="text-green-500">{message}</p>
                        </div>
                    )}
                    {error && (
                        <div onClick={() => setError('')} className="px-2 cursor-pointer mx-auto mt-3 py-1 text-sm bg-red-500/20 w-[18rem] text-center">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
