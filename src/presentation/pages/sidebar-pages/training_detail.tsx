/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { extra } from '@/utils/image-exporter';
import { formatMoney } from '@/utils/formatToMoney';
import { LoaderText } from '@/presentation/components/dashboard-components/loader-text/loader-text';
import { AlertUtils } from '@/utils/alert-utils';
import { FaCheckCircle } from 'react-icons/fa';
import { ROUTE_MY_TRAININGS } from '@/utils/sidebar-utils';
import { FaGift } from 'react-icons/fa6';
import { applyCoupon, calculateDiscountedPrice, handlePaymentConfirm, validateCoupon } from '@/utils/training-details-utils';
import { getTabs, useCourseMaterials, useCourseModules } from '@/utils/courseData-tabs';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';
import { ITraining } from '@/interfaces/training/training';
import { Button, HakyOffSquare } from '@/presentation/components';
import { CustomVideoPlayerDash } from '@/presentation/components/dashboard-components/custom-dash-player/custom_dashboard_player';
import TabsComponent from '@/presentation/components/dashboard-components/tabs-components/tabs_components';
import { fetchMyCourses, fetchOneCourseData } from '@/utils/my-course-utils';

interface CourseProps {
    course?: ITraining;
    mycourses: ITraining[];
    handleBuyCourse: () => void;
}




export const TrainingDetail: React.FC = () => {
    const { id_course } = useParams();
    const [loading, setloading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [submited, setSubmited] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [course, setCourse] = useState<ITraining | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'transfer' | ''>('cartao');
    const [statusPagamento, setStatusPagamento] = useState<'pendente' | 'aprovado'>('pendente');
    const [cardData, setCardData] = useState<{ cardNumber: string; expiryDate: string; cvv: string }>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [boletoFile, setBoletoFile] = useState<File | null>(null);
    const { currentUser, userSettings } = useAuth();
    const [couponCode, setCouponCode] = useState<string>(sessionStorage.getItem(id_course + '_c') ?? '');
    const [discount, setDiscount] = useState(sessionStorage.getItem(id_course + '_d') ?? '');

    const [mycourses, setmyCourses] = useState<ITraining[]>([]);

    useEffect(() => {
        const loadCourses = async () => {
            const fetchedCourses = await fetchMyCourses(currentUser);
            setmyCourses(fetchedCourses);
        };

        loadCourses();
    }, [currentUser]);



    const discountt = parseInt(discount)


    const validateAndApplyCoupon = async () => {
        try {
            const isValid = await validateCoupon(couponCode, currentUser?.email || '', id_course ? id_course : '', setDiscount);

            if (isValid) {
                await applyCoupon(couponCode, currentUser?.email || '');
                setCouponCode('');
            }
        } catch (error) {
            console.error('Erro ao validar o cupom:', error);
        }
    };



    /*
    const course: ITraining[] = id_course
        ? TrainingsData.filter((c) => c.id === id_course)
        : [];
*/


    document.title = 'Detalhes do Treinamento | HakyOff Academy';


    useEffect(() => {
        fetchOneCourseData(setCourse, id_course ? id_course : '');
    }, [id_course]);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleBuyCourse = async () => {
        setShowPaymentModal(true); // Abrir o modal de pagamento
    };


    const handlePaymentConfirmClick = async () => {
        setloading(true);
        setStatusPagamento('pendente');

        if (!currentUser) {
            AlertUtils.error('Você precisa estar logado para comprar um curso.');
            return;
        }

        try {
            await handlePaymentConfirm({
                id_course: course?.id ? course?.id : '',
                currentUser,
                paymentMethod,
                statusPagamento,
                cardData,
                boletoFile: boletoFile || null,
                discount,
                course,
                setloading,
                setSubmited,
                setFile,
                setBoletoFile,
                setShowPaymentModal,
            });

            AlertUtils.success('Sua compra deste treinamento foi submetido com sucesso, está aguardando aprovação.');
        } catch (error) {
            setloading(false);
            console.error('Erro ao confirmar pagamento:', error);
            AlertUtils.error('Erro ao confirmar pagamento. Por favor, tente novamente mais tarde.');
        }
    };


    const handleCardInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCardData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBoletoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setBoletoFile(file);
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);
        }
    };


    const modules = useCourseModules(course?.id ? course?.id : '');

    const materials = useCourseMaterials(course?.id ? course?.id : '');

    const tabs = getTabs(course, modules, materials);


    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <div className="flex gap-4">
                    <div className="relative w-full p-4 bg-white rounded-lg dark:bg-slate-100/10">
                        <div className="flex justify-between">
                            <HakyOffSquare />

                            {mycourses.map((course) => (
                                <CourseButton
                                    key={course.course_code}
                                    course={course}
                                    mycourses={mycourses}
                                    handleBuyCourse={handleBuyCourse}
                                />
                            ))}
                            <div className="hidden">
                                {
                                    mycourses.length === 0 && <button onClick={handleBuyCourse} className='px-6 py-2 font-semibold rounded-md hacker click bg-primary'>
                                        Comprar
                                    </button>
                                }
                            </div>

                        </div>
                        <h2 className="mt-4 text-3xl font-bold dark:text-white hacker text-">
                            {course?.title}
                        </h2>
                        <br />
                        <br />
                        <CustomVideoPlayerDash src={course?.link ? course?.link : ''} />
                    </div>
                    <div className="w-5/12 px-4 py-3 bg-white rounded-md dark:bg-slate-100/10 dark:text-white">
                        <TabsComponent tabs={tabs} />
                    </div>
                </div>
            </div>

            {/* Modal de Pagamento */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-[38em] h-[30.5rem] z-100 p-8 dark:bg-slate-700 dark:border dark:border-white/50 dark:text-white bg-white rounded-lg">
                        <h2 className="mb-4 text-2xl font-bold hacker">Escolha o método de pagamento</h2>
                        <p className="mb-3  hacker">Preço do Treinamento: <b>{discount ? <> {calculateDiscountedPrice(discountt, course?.price ? course?.price : 0)} - <span className='text-red-400 line-through'> {formatMoney(course?.price ? course?.price : 0)}</span></> : formatMoney(course?.price ? course?.price : 0)}</b></p>
                        {discount
                            ?

                            <>
                                <span className="text-xs text-gray-700 dark:text-white/70"> Foi aplicado um desconto de {discount}% </span>
                            </>
                            : null

                        }
                        {
                            submited ?

                                <>
                                    <center>
                                        <FaCheckCircle className='text-green-400 text-8xl' />

                                        <br />
                                        <p className="text-gray-600 dark:text-white">Seu pagamento para o treinamento <b className='underline hacker'>{course?.title}</b> foi submetido com sucesso, verifique em   <a className='text-yellow-600 underline hacker' href={ROUTE_MY_TRAININGS}>seus treinaentos</a></p>
                                        <br />
                                        <center>

                                            <button onClick={() => { setShowPaymentModal(false), setSubmited(false) }} className="px-4 py-2 text-white bg-red-500 rounded-md hacker hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                                Entendi
                                            </button>
                                        </center>
                                    </center>
                                </>

                                :

                                <>

                                    {
                                        !discount &&
                                        <div className="mb-4">
                                            <label htmlFor="coupon-code" className="block mb-2 text-sm font-medium text-gray-700">Tem algum código de desconto ?</label>
                                            <div className="flex gap-2 mb-6">
                                                <FaGift className='my-auto ' />
                                                <input
                                                    type="text"
                                                    id="coupon-code"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    className="text-xs input_card"
                                                    placeholder="Insira seu cupom"
                                                />
                                                <Button text='Aplicar' className='text-xs' onClick={validateAndApplyCoupon} color='primary' />

                                            </div>
                                        </div>
                                    }


                                    <div className="flex mb-4 text-sm border-y">
                                        <div onClick={() => setPaymentMethod('cartao')} className={`w-full ${paymentMethod == 'cartao' && 'border-b-4 border-primary bg-primary/10 font-bold'} hacker my-auto text-center`}>
                                            <button className={`px-2 py-2 dark:text-white text-black rounded-md  `}>
                                                Cartão de Crédito
                                            </button>
                                        </div>
                                        <div onClick={() => setPaymentMethod('transfer')} className={`w-full ${paymentMethod == 'transfer' && 'border-b-4 border-primary bg-primary/10 font-bold'} hacker my-auto text-center`}>
                                            <button className="px-4 py-2 ">
                                                Transferência / Depósito
                                            </button>
                                        </div>

                                    </div>

                                    {/* Campos adicionais para Cartão de Crédito */}
                                    {paymentMethod === 'cartao' && (
                                        <div className='grid grid-cols-2 gap-3 hacker'>
                                            <input disabled={loading} className={` input_card `}
                                                type="text" name="cardNumber" placeholder="Número do cartão" value={cardData.cardNumber} onChange={handleCardInputChange} />
                                            <input disabled={loading} className={` input_card`} type="date" name="expiryDate" placeholder="Data de expiração" value={cardData.expiryDate} onChange={handleCardInputChange} />
                                            <input disabled={loading} maxLength={4} className={` input_card`} type="number" name="cvv" placeholder="CVV" value={cardData.cvv} onChange={handleCardInputChange} />
                                        </div>
                                    )}

                                    {/* Campos adicionais para Boleto Bancário */}
                                    {paymentMethod === 'transfer' && (
                                        <div>
                                            <div className="flex gap-2">
                                                <div className='w-full text-sm'>
                                                    <div className="flex justify-between gap-3 pe-4">
                                                        <b>Titular:</b>
                                                        <span>HakyOff Company</span>
                                                    </div>
                                                    <div className="flex justify-between gap-3 pe-4">
                                                        <b>IBAN:</b>
                                                        <span>2345.4523.2343.4354.4</span>
                                                    </div>
                                                    <div className="flex justify-between gap-3 pe-4">
                                                        <b>Banco:</b>
                                                        <span className='font-bold'>BAI</span>
                                                    </div>
                                                    <div className="p-2 mt-3 mb-3 text-xs text-orange-700 bg-orange-100 rounded-md me-4">
                                                        <b className='text-orange-800'>Nota:</b> A aprovação do seu pedido pode levar até 24 horas úteis.
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[9rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        {file ? (
                                                            <div className="relative w-full h-full overflow-hidden">
                                                                {file.type.includes('image') ? (
                                                                    <img src={URL.createObjectURL(file)} className="object-cover w-full h-full" alt="Preview do arquivo" />
                                                                ) : (
                                                                    <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-600">
                                                                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M7.293 13.293a1 1 0 0 1 1.414 0L10 14.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414zM5 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3.586a1 1 0 0 1-.293.707l-3 3a1 1 0 0 1-1.414 0l-3-3A1 1 0 0 1 5 8.586V5zm2-2a1 1 0 0 0-1 1v1.293l3.146 3.147a1 1 0 0 0 1.414 0L14 5.707V4a1 1 0 0 0-1-1H7z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                                <button onClick={() => setFile(null)} className="absolute p-1 bg-gray-200 rounded-full top-2 right-2 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                                                                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center pt-1 pb-">
                                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                </svg>
                                                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique ou</span> arraste para submeter o ficheiro</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG ou PDF (MAX. 800x400px)</p>
                                                            </div>
                                                        )}
                                                        <input id="dropzone-file" type="file" accept=".pdf,.jpg,.png" onChange={handleBoletoFileChange} className="hidden" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </>

                        }
                        <div className={`${paymentMethod === 'cartao' && 'mt-[1.15rem]'}`}>
                            {!submited && paymentMethod !== 'transfer' && (
                                <div className="mt-auto text-end">
                                    <img src={extra.secure_pay} className='w-[11em] ms-auto' alt="" />

                                </div>

                            )}

                            <div className="flex justify-between gap-4 mt-4">
                                {
                                    !submited && <>


                                        <button onClick={() => { setShowPaymentModal(false), setSubmited(false) }} className="px-4 py-2 text-red-700 border-2 border-red-500 rounded-md hover:text-white dark:text-red-300 hacker hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                            Cancelar
                                        </button>


                                        {
                                            loading ?
                                                <LoaderText className='my-auto' text='Processando pagamento...' />
                                                : <Button text='Efetuar Pagamento' color='primary' className='click hacker' onClick={handlePaymentConfirmClick} />
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};




const CourseButton: React.FC<CourseProps> = ({ course, mycourses, handleBuyCourse }) => {
    // Verifica se o curso está na lista de cursos
    const isCourseIncluded = course?.id !== undefined && mycourses.some(c => c.id === course.id);

    // Renderiza o botão apropriado
    return (
        <div className="course-button-container">
            {isCourseIncluded ? (
                course?.statusPagamento === 'aprovado' ? (
                    <button className='py-2 font-semibold bg-green-300 cursor-default px-14 hacker'>
                        Comprado
                    </button>
                ) : (
                    <button className='px-6 py-2 font-semibold rounded-md hacker click bg-warning'>
                        Compra Pendente
                    </button>
                )
            ) : (
                <button onClick={handleBuyCourse} className='px-6 py-2 font-semibold rounded-md hacker click bg-primary'>
                    Comprar
                </button>
            )}

        </div>
    );
};
