/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { bg, svgs, users } from '../../../utils/image-exporter';
import { useAuth } from '../../../context/auth-context';
import { Button } from '../../components';
import { FaCamera, FaCheckCircle, FaPencilAlt, FaUserAlt } from 'react-icons/fa';
import { LoaderText } from '../../components/dashboard-components/loader-text/loader-text';
import { IHackerScore } from '@/domain/models/score-model';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification, updatePassword } from 'firebase/auth';
import { AlertUtils } from '@/utils/alert-utils';
import { toHackerName } from '@/utils/to-hacker-name';
import { HakyModalDefault } from '../../components/haky-modal-default/hacky-modal-default';
import { ITraining } from '@/interfaces/training/training';
import { fetchMyCourses } from '@/utils/my-course-utils';
import { fetchHackerAndPosition } from '@/services/fetchAllhackersProfilePage';
import { actionCodeSettings } from '@/domain/config/env';


export const ProfilePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setloading] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openChangePass, setopenChangePass] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [Company, setCompany] = useState<string | null>(null);
  const [Role, setRole] = useState<string | null>(null);
  const [Address, setAddress] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [hacker, setHacker] = useState<IHackerScore | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const { userSettings, currentUser, updateProfile } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');


  const [courses, setCourses] = useState<ITraining[]>([]);

  document.title = `Perfil ${currentUser?.displayName}  | HakyOff`


  useEffect(() => {
    const loadCourses = async () => {
      const fetchedCourses = await fetchMyCourses(currentUser);
      setCourses(fetchedCourses);
      // setLoading(false);
    };

    loadCourses();
  }, [currentUser]);


  useEffect(() => {
    fetchHackerAndPosition(currentUser!.email, setPosition, setHacker);
  }, [currentUser]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const handleSaveChanges = async () => {
    setloading(true)
    try {
      if (displayName || photoURL || Role || Address || Company) {
        await updateProfile(displayName, '', photoURL, null, Address, Company, Role);
        setloading(false)
      }

      setIsEditing(false);
      setloading(false)
    } catch (error) {
      setloading(false)
      // console.error('Erro ao atualizar perfil:', error);
      // Tratar erro de atualização de perfil, se necessário
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  function closeModal() {
    setopenChangePass(!openChangePass)
  }

  // console.log(currentUser)


  const handleChangePassword = async () => {
    if (!currentUser) {
      setError('Usuário não autenticado.');
      return;
    }

    setLoadingC(true);
    setError('');

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email ? user.email : '', oldPassword);

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setLoadingC(false);
        AlertUtils.success('Sua senha foi alterada com sucesso!')
        setOldPassword('')
        setNewPassword('')
        closeModal();
      } catch (error: any) {
        setLoadingC(false);
        setError('Erro ao alterar a senha. Verifique sua senha antiga e tente novamente. ');
      }
    } else {
      setLoadingC(false);
      setError('Erro ao autenticar usuário.');
    }
  };

  const userName = currentUser?.displayName?.split(' ').pop() + '_hak' || ''; // Suponha que este seja o nome a ser convertido
  const hackerName = toHackerName(userName);


  async function verifyEmail() {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        await sendEmailVerification(currentUser, actionCodeSettings);
        AlertUtils.success("Seu e-mail de verificação foi enviado com sucesso, ")
      } else {
        throw new Error("Usuário não está autenticado.");
      }
    } catch (error: any) {
      AlertUtils.error("Ocorreu um erro ao tentar verificar seu email: " + error.message);
    }
  }


  return (
    <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} darkMode={darkMode} isOpen={isOpen} />

      <div className={`min-h-screen p-4 sm:pt-20 pt-10 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
        <div style={{ background: `url(${bg.bg_student}) center center`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="relative dark:border-2 dark:border-primary w-full h-[14rem] overflow-visible rounded-2xl">
          <div className="px-5 sm:flex-row flex-col dark:border-x-2 dark:border-primary flex gap-5 -bottom-[3rem] py-4 absolute w-[95%] mx-auto rounded-3xl left-0 right-0 backdrop-blur-xl bg-white/60 shadow-md">
            <div className='flex gap-4'>
              <div className="relative">
                <div
                  style={{
                    background: `url(${photoURL || currentUser?.photoURL || users.user_default}) center center`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                  className="w-20 h-20 my-auto border-2 rounded-full border-primary bg-primary">
                </div>
                <label htmlFor="profile-photo">
                  {isEditing && (
                    <div className="absolute left-0 right-0 grid items-center w-10 p-2 mx-auto text-center rounded-md shadow-lg cursor-pointer bg-primary place-content-center bottom-4">
                      <FaCamera className='' />
                    </div>
                  )}
                  <input
                    type="file"
                    id="profile-photo"
                    className="hidden"
                    onChange={handlePhotoChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="my-auto">
                <h2 className="text-xl font-bold">
                  {currentUser?.displayName}
                </h2>
                <div className="flex gap-3">
                  <b className="my-auto font-medium hacker">
                    @{hackerName}
                  </b>

                </div>
              </div>
            </div>
            <div className="flex lg:flex-row sm:flex-col gap-2 my-auto sm:ms-auto">
              <Button color='primary' className='text-xs click' text='Alterar senha' onClick={() => setopenChangePass(!openChangePass)} />

              <Button color='primary' className='text-xs click' rightIcon={FaPencilAlt} text='Editar perfil' onClick={() => setIsEditing(isEditing ? false : !isEditing)} />
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="flex flex-wrap lg:flex-nowrap w-full mt-6 gap-6">
          <div className="lg:w-8/12 w-full px-5 py-6  dark:text-white bg-white rounded-lg shadow dark:bg-slate-100/10 text-start">
            <div className="flex justify-between w-full mb-2">
              <div>
                <h1 className="font-semibold">Informações do Perfil</h1>
                <span className="text-xs  dark:text-white text-orange-800">Uma vez comprado um treinamento, não poderá alterar seu nome nem o e-mail</span>

              </div>
              <span>

                <FaUserAlt className='text-sm' />
              </span>
            </div>
            <hr />
            <br />
            <div className="flex flex-wrap sm:flex-nowrap sm:flex-no-wrap gap-14">
              <div className='w-full sm:w-auto'>
                <div className='flex flex-col my-2'>
                  <b>Nome completo:</b>
                  {
                    isEditing ? (
                      <div className='relative flex flex-col w-full'>
                        <input
                          type="text"
                          disabled={courses.length > 0}
                          className="px-3 w-full disabled:border-white/20 disabled:dark:text-white text-black  dark:text-black py-1 border outline-none hacker focus-within:border-primary "
                          defaultValue={currentUser?.displayName || ''}
                          onChange={(e) => courses.length > 0 ? null : setDisplayName(e.target.value)}
                        />
                        <span className='text-xs -bottom-4 dark:text-red-300/80 text-red-700/80 left- absolute'>{courses.length > 0 && 'Já não pode alterar seu nome'}</span>
                      </div>
                    ) : (
                      <h2 className='hacker'>{currentUser?.displayName}</h2>
                    )
                  }
                </div>
                <br />
                <div className='flex flex-col my-2'>
                  <b>Empresa</b>
                  {
                    isEditing ? (
                      <input
                        type="text"
                        className="px-3 py-1  dark:text-black  border outline-none hacker focus-within:border-primary "
                        defaultValue={currentUser?.company || ''}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    ) : (
                      <h2 className='hacker'>{currentUser?.company ? currentUser?.company : '-----------------'}</h2>
                    )
                  }
                </div>

                <br />
                <div className=' flex-col my-2'>
                  <b className='flex gap-2'>Email: <div onClick={() => currentUser?.emailVerified ? null : verifyEmail()} className={`flex ${currentUser?.emailVerified ? 'bg-green-600  text-white dark:text-white ' : ' cursor-pointer bg-red-600'} px-2 rounded-xl gap-1`}>
                    {currentUser?.emailVerified && <FaCheckCircle className='my-auto' />}
                    <span className="text-xs font-light my-auto ">{currentUser?.emailVerified ? 'Verificado' : 'Confirmar email'}</span>
                  </div></b>
                  <h2 className='hacker'>{currentUser?.email}</h2>
                </div>
              </div>
              <div className='w-full sm:w-auto'>

                <div className='flex flex-col '>
                  <b>Profissão:</b>
                  {
                    isEditing ? (
                      <input
                        type="text"
                        className="px-3 py-1   dark:text-black border outline-none hacker focus-within:border-primary "
                        defaultValue={currentUser?.role || ''}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    ) : (
                      <h2 className='hacker'>{currentUser?.role ? currentUser?.role : '-----------'}</h2>
                    )
                  }
                </div>
                <br />
                <div className='flex flex-col '>
                  <b>Endereço / Morada:</b>
                  {
                    isEditing ? (
                      <input
                        type="text"
                        className="px-3 py-1   dark:text-black border outline-none hacker focus-within:border-primary "
                        defaultValue={currentUser?.address || ''}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <h2 className='hacker'>{currentUser?.address ? currentUser?.address : '-----------'}</h2>
                    )
                  }
                </div>
              </div>
            </div>
            <br />
            {
              isEditing && (
                <>

                  {
                    loading ?

                      <LoaderText className='mt-4 text-sm text-black/70' text='Salvando dados' />
                      :
                      <Button color='primary' className='text-xs click' text='Salvar alterações' onClick={handleSaveChanges} />


                  }


                </>
              )
            }
          </div>

          <div className="lg:w-4/12 w-full px-5 py-4 text-center bg-white rounded-lg shadow  dark:text-white dark:bg-slate-100/10">
            <div className="flex justify-between w-full mb-2">
              <h1 className="font-semibold">Informações do Perfil</h1>
              <img src={hacker?.score && hacker?.score <= 95 ? svgs.tocha_svg : hacker?.score && hacker?.score <= 499 ? svgs.bronze_trophy_svg : hacker?.score && hacker?.score >= 500 && hacker?.score && hacker?.score < 999 ? svgs.silver_trophy_svg : svgs.award_trophy_svg} className='w-7' alt="level status" title='Medalha de reconhecimento perante a comunidade' />

            </div>
            <div className="flex justify-between my-5">
              <b className='my-auto'>Sua Posição </b>
              <span className="my-auto font-semibold text-yellow-700 dark:text-yellow-300 hacker">{position}º Lugar</span>
            </div>
            <hr />
            <div className="flex justify-between my-5">
              <b className='my-auto'>Pontuação Geral</b>
              <span className="my-auto font-semibold text-yellow-700 dark:text-yellow-300 hacker">{hacker?.score}</span>
            </div>
            <div className="flex justify-between my-5">
              <b className='my-auto'>Desafios </b>
              <span className="my-auto font-semibold text-yellow-700 dark:text-yellow-300 hacker">{hacker?.solved_challenges}</span>
            </div>
            <div className="flex justify-between my-5">
              <b className='my-auto'>Pontuação no hacking </b>
              <span className="my-auto font-semibold text-yellow-700 dark:text-yellow-300 hacker">{hacker?.score}</span>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>



      {

        openChangePass && (
          <HakyModalDefault className='bg-white px-8 w-[22rem] py-10' bgDefault={false} setShow={closeModal} show={openChangePass} >
            <div className='w-full mt-8'>
              <div className="flex flex-col mb-3">
                <label htmlFor="oldPassword" className="text-sm form-label hacker">Password Antiga</label>
                <input
                  type="password"
                  className="px-2 w-full  py-2 mt-1 border-2 rounded-md outline-none focus-within:border-primary"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Digite sua password antiga"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="newPassword" className="text-sm form-label hacker">Nova Password</label>
                <input
                  type="password"
                  className="px-2 py-2 mt-1 border-2 rounded-md outline-none focus-within:border-primary"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Digite sua nova password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              {error && <p className="px-2 py-1 mb-3 text-sm text-red-700 border border-red-200 rounded-md hacker bg-red-100/40">{error}</p>}
              <div className="flex justify-end">
                <Button color='primary' className='text-sm mt-4' onClick={handleChangePassword}
                  disabled={loadingC} text={loadingC ? 'Alterando...' : 'Alterar Senha'} />

              </div>
            </div>
          </HakyModalDefault>
        )

      }

    </div>
  );
};
