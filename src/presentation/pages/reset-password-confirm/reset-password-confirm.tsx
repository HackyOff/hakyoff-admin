/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { logos } from '@/utils/image-exporter';
import { Button } from '@/presentation/components/button/button';
import { ROUTE_LOGIN } from '@/utils/sidebar-utils';
import { LoaderText } from '@/presentation/components/dashboard-components/loader-text/loader-text';

export const PasswordResetConfirm: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);

    const handlePasswordReset = async () => {
        setLoad(true)
        const auth = getAuth();
        const oobCode = searchParams.get('oobCode');

        if (!oobCode) {
            setError('Código de redefinição de senha inválido ou ausente.');

            setLoad(false)
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage('Senha redefinida com sucesso, faça login .');
            setNewPassword('')
            setError('');

            setLoad(false)
            setTimeout(() => {
                setMessage('')
                window.location.href = ROUTE_LOGIN
            }, 5000);
        } catch (error: any) {
            setMessage('');

            setLoad(false)
            setTimeout(() => {
                setMessage('')
            }, 7000);
            setError('Erro ao redefinir a senha: ' + error.message);
        }
    };

    return (
        <div className="grid items-center h-screen bg-black place-content-center password-reset-request ">
            <div className='px-6 w-[25rem]    py-10 border rounded-md border-slate-300/50 bg-transparent'>
                <center>
                    <img src={logos.logo_2} className="w-[8rem] 2xl:w-[12rem] 2xl:mb-4" alt="" />
                    <h1 className="text-xl font-bold text-white sm:text-2xl glitch hacker" data-text='Confirmar nova senha'>
                        Confirmar nova senha
                    </h1>
                </center>
                <div className="flex flex-col mb-3">
                    <br />
                    <input
                        type="password"
                        className="w-full px-3 py-2 text-white bg-transparent border-2 rounded-md outline-none focus-within:border-primary"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Digite sua nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <center>

                    {
                        load ?

                            <LoaderText className='mx-auto text-white' text='Redefinindo.' />
                            :

                            <Button onClick={handlePasswordReset} color='primary' className='mx-auto text-sm mt-7' text='Redefinir' />

                    }

                </center>


                <div className="">
                    {message && <div onClick={() => setMessage('')} className="px-2 cursor-pointer m mx-auto mt-3 py-1 text-sm bg-green-400/20 rounded-md w-[18rem] text-center ">
                        <p className="text-green-600">{message}</p>
                    </div>}
                    {error && <div onClick={() => setError('')} className="px-2 cursor-pointer mx-auto mt-3 py-1 text-sm bg-red-500/20 rounded-md w-[18rem] text-center ">

                        <p className="text-red-500">{error}</p>
                    </div>}
                </div>
            </div>
        </div >
    );
};
