import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyActionCode, getAuth, onAuthStateChanged } from 'firebase/auth';
import { AlertUtils } from '@/utils/alert-utils';
import { FaCheckCircle } from 'react-icons/fa';
import { logos } from '@/utils/image-exporter';

const VerifyEmail = () => {
  const location = useLocation();
  const [verificationState, setVerificationState] = useState('Verificando...');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(isAuthenticated)

  useEffect(() => {
    // Extraia o oobCode da URL
    const searchParams = new URLSearchParams(location.search);
    const oobCode = searchParams.get('oobCode');

    if (oobCode) {
      // Verifique o código de ação com o Firebase
      const auth = getAuth();
      applyActionCode(auth, oobCode)
        .then(() => {
          setVerificationState('Email verificado com sucesso!');
          AlertUtils.success('Seu e-mail foi verificado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao verificar o email:', error);
          setVerificationState('Falha na verificação do email. O código pode ter expirado ou já ter sido usado.');
          AlertUtils.error('Falha na verificação do email. O código pode ter expirado ou já ter sido usado');
        });
    } else {
      setVerificationState('Código de verificação não encontrado.');
      AlertUtils.error('Código de verificação não encontrado.');
    }
  }, [location]);

  return (
    <div className='h-screen grid items-center place-content-center'>
      <center className='w-[30em]'>
        <FaCheckCircle className='text-9xl text-green-500' />
        <br />
        <img src={logos.logo_2} className='w-[10em]' alt="" />
        <h1 className="text-xl font-semibold text-white sm:text-3xl hacker" data-text='Sua conta foi verificada com sucesso'>
          Sua conta foi verificada com sucesso
        </h1>
        <br />
        <a href="/dashboard" className="mt-3 border px-3 py-2 border-primary rounded-sm hover:underline text-primary">Efetuar login</a>
      </center>
      <h1>{verificationState}</h1>
    </div>
  );
};

export default VerifyEmail;
