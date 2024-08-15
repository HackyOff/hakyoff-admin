/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { logos } from "../../../utils/image-exporter";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ROUTE_RESET_PASS } from "@/utils/sidebar-utils";
import { loginUser, loginUserWithGoogle, registerUser } from "@/infra/services/auth-service";
import { AlertUtils } from "@/utils/alert-utils";
// Import a library for sanitizing input
import DOMPurify from 'dompurify';



export function LoginPage() {

    document.title = 'Login to the Academy | HakyOff ';
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    //  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);



    const [formData, setFormData] = useState({
        nome: '',
        ddd: '',
        email: '',
        telefone: '',
        password: '',
        cod_aluno: Math.floor((Math.random() * 1000000) + 1),
        photo: '',
        role: '',
        company: '',
        address: '',
        fb: '',
        tw: '',
        in: '',
        insta: '',
        country: ''
    });



    /*
        const handleRecaptchaChange = (token: string | null) => {
            setRecaptchaToken(token);
        };
    
    */

    const [errors, setErrors] = useState({
        nome: false,
        email: false,
        password: false
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: DOMPurify.sanitize(value) });
    };

    const validateForm = () => {
        const newErrors = {
            nome: !isLogin && !formData.nome,
            email: !formData.email,
            password: !formData.password || formData.password.length < 5
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        if (formData.password.length <= 7) {
            AlertUtils.error('A password deve ter no mínimo 8 caracteres')
            return
        }
        setLoading(true);

        try {
            if (isLogin) {
                await loginUser(formData.email, formData.password);
            } else {
                await registerUser(formData);
            }
            //alert('Sucesso!');
            //navigate('/dashboard');
        } catch (error: any) {
            //let errorMessage = 'Erro desconhecido ao processar a solicitação.';
            let errorMessage = error.code;
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este email já está em uso, texnte novamente ou recupere sua senha';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'O formato do email é inválido.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'A senha é muito fraca.';
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                errorMessage = 'Email ou senha incorreta.';
            } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
                errorMessage = 'Email ou senha incorreta.';
            } else if (error.code === 'auth/popup-blocked' || error.code === 'auth/user-not-found') {
                errorMessage = 'Popup bloqueado pelo seu navegador';
            }
            setLoginError(errorMessage);
            setTimeout(() => {
                setLoginError(null);
            }, 5000);
        }
        setLoading(false);
    };



    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginUserWithGoogle();

            //navigate('/dashboard');
        } catch (error: any) {

            if (error.code === 'auth/popup-blocked' || error.code === 'auth/user-not-found') {
                setLoginError('Popup bloqueado pelo seu navegador');
            }

            setTimeout(() => {
                setLoginError(null);
            }, 5500);
        }
        setLoading(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const options = countryList().getData().map(country => ({
        ...country,
        label: (
            <div className="flex items-center text-black">
                <img className="w-6 h-4 mr-2" src={`https://flagsapi.com/${country.value}/flat/64.png`} alt={country.label} />
                {country.label}
            </div>
        )
    }));

    const handleCountryChange = (selectedOption: any) => {
        setFormData({ ...formData, country: selectedOption.value });
    };

    return (
        <div className={`relative flex items-center justify-center ${isLogin ? 'h-screen' : '2xl:h-screen h-full'} login-bg`}>
            <div className="absolute inset-0 bg-center bg-cover opacity-50 bg-hacking"></div>
            <div className="relative z-10 w-full max-w-md p-8 text-white border rounded-lg shadow-lg lg:mt-24 bg-black/50 border-white/15 bg-opacity-90">
                <center>
                    <img src={logos.logo_2} className="w-[8rem]" alt="" />
                    <h1 className="text-xl font-bold text-white sm:text-2xl glitch 2xl:text-6xl hacker" data-text={'Admin'}>
                        Admin
                    </h1>
                </center>
                {!isLogin && (
                    <>
                        <div className="flex flex-col gap-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Nome completo</label>
                                <input
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    type="text"
                                    disabled={loading}
                                    className={`w-full  px-3 py-2 text-white bg-gray-800  ${errors.nome ? 'border-red-500 border-2' : 'border-gray-200/40 border'} rounded-md focus:outline-none focus:border-primary`}
                                />
                            </div>
                        </div>



                    </>
                )}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                        type="email"
                        className={`w-full px-3 py-2 text-white bg-gray-800  ${errors.email ? 'border-red-500' : 'border-gray-200/40 border'} rounded-md focus:outline-none focus:border-primary`}
                    />
                </div>
                {!isLogin && (
                    <>


                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-white">País</label>
                            <Select
                                options={options}
                                value={options.find((option: any) => option.value === formData.country)}
                                onChange={handleCountryChange}
                                classNamePrefix=""
                                placeholder='Selecione seu país'
                                className="w-full bg-black shadow-none"
                            />
                        </div>

                    </>
                )}
                <div className="relative mb-4">
                    <label className="block mb-2 text-sm font-medium">Senha</label>
                    <div className={` bg-gray-800 border rounded-md ${errors.password ? 'border-red-500 border-2' : 'border-gray-200/40 border'} focus:outline-none focus:border-primary flex`}>
                        <input
                            name="password"
                            value={formData.password}
                            minLength={6}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}
                            onChange={handleInputChange}
                            type={showPassword ? 'text' : 'password'}
                            className={`w-full px-3 py-2 text-white bg-transparent outline-none`}
                        />
                        <span

                            className="px-2 my-auto text-xl cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye className="text-primary" />}
                        </span>
                    </div>
                </div>

                {loginError && (
                    <div className="py-2 mb-4 text-center transition-all shadow-sm bg-red-600/50 shadow-red-600">
                        <h1 className="text-xs font-bold text-white glitch hacker" data-text={loginError}>
                            {loginError}
                        </h1>
                    </div>
                )}


                <button onClick={handleSubmit} disabled={loading} type="submit" className="w-full py-2 mt-3 text-black transition-all duration-300 rounded-md disabled:bg-yellow-700 bg-primary hover:bg-primary/90">
                    {loading ? (
                        <div className="flex justify-center w-full text-white/70">
                            <FaSpinner className="text-2xl animate-spin" />
                            <span className="ms-2">{isLogin ? 'Entrando' : 'Cadastrando'}</span>
                            <Typewriter
                                words={["..."]}
                                loop={30}
                                cursor
                                cursorStyle="."
                                typeSpeed={30}
                                deleteSpeed={50}
                                delaySpeed={500}
                            />
                        </div>
                    ) : (
                        <>
                            {isLogin ? 'Entrar' : 'Cadastrar'}
                        </>
                    )}
                </button>
                <button onClick={handleGoogleLogin} className="flex justify-center hidden w-full gap-2 px-4 py-2 mx-auto mt-4 text-center transition duration-150 border rounded-lg border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span className="text-gray-300">  {isLogin ? 'Login' : 'Cadastrar'} com Google</span>
                </button>
                <p className="hidden mt-4 text-center">
                    {
                        isLogin &&
                        <>
                            <span onClick={() => window.location.href = ROUTE_RESET_PASS} className="text-xs cursor-pointer hover:underline text-primary">Recuperar senha</span><br /></>
                    }
                    {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                    <span className="cursor-pointer hover:underline text-primary" onClick={toggleForm}>
                        {isLogin ? 'Cadastre-se' : 'Entre'}
                    </span>
                </p>
            </div>
        </div>
    );
}
