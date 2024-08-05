/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { logos, svgs } from '@/utils/image-exporter';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/domain/config/firebase';

export const ConfirmEmailAccount: React.FC = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendVerificationEmail = async () => {
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                setMessage('Email de verificação reenviado com sucesso.');
            } else {
                setError('Nenhum usuário autenticado encontrado.');
            }
        } catch (error) {
            console.error('Erro ao reenviar email de verificação:', error);
            setError('Erro ao reenviar email de verificação.');
        }
    };

    return (
        <div className="grid items-center h-screen bg-black place-content-center password-reset-request ">
            <div className='px-6 w-[25rem] h-auto py-10 border rounded-md border-slate-300/50 bg-transparent'>
                <center>
                    <img src={svgs.email_confirm_svg} className='w-[8rem] 2xl:w-[12rem] 2xl:mb-4' alt="" />
                    <img src={logos.logo_2} className="w-[8rem] 2xl:w-[12rem] 2xl:mb-4" alt="" />
                    <h1 className="text-xl font-bold text-white sm:text-2xl glitch hacker" data-text='Um email de Confirmação enviado'>
                        Um email de Confirmação enviado
                    </h1>
                </center>
                <div className="flex flex-col mb-3">
                    <br />
                    <p className='text-white text-center'>
                        Foi enviado um email de confirmação para o seu email para verificar sua conta, use o dispositivo onde efetuou o seu cadastro
                    </p>
                    <br />
                    <a className='text-primary hover:underline text-center cursor-pointer' onClick={handleResendVerificationEmail}>
                        Solicitar novamente
                    </a>
                </div>

                <div className="">
                    {message && (
                        <div onClick={() => setMessage('')} className="px-2 cursor-pointer mx-auto mt-3 py-1 text-sm bg-green-400/20 rounded-md w-[18rem] text-center ">
                            <p className="text-green-600">{message}</p>
                        </div>
                    )}
                    {error && (
                        <div onClick={() => setError('')} className="px-2 cursor-pointer mx-auto mt-3 py-1 text-sm bg-red-500/20 rounded-md w-[18rem] text-center ">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
