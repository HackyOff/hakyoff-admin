import { ITraining } from "@/interfaces/training/training";
import { FaCheckCircle } from "react-icons/fa";
import { ROUTE_MY_TRAININGS } from "@/utils/sidebar-utils";

interface ICMCourses {
    course: ITraining;
}


export function CardMyCoursesDashboard({ course }: ICMCourses) {
    // Supondo que 'progresso' seja um campo numérico de 0 a 100 no objeto 'course'
    const progresso = course.progresso || 0; // Valor padrão de 0 se não houver 'progresso' definido

    return (
        <div title={'Clique para continuar ' + course.title} onClick={() => window.location.href = ROUTE_MY_TRAININGS + '/' + course.id} className="cursor-pointer relative w-full p-3 bg-white rounded-lg shadow dark:bg-slate-100/10 dark:text-white">
            <div className="p-2">
                <h3 className="text-xl font-semibold hacker">{course.title}</h3>
                <div className="flex items-center mb-1">
                    <div className="flex-1 mt-2">
                        <div className="h-2 overflow-hidden bg-gray-200 rounded-md">
                            <div style={{ width: `${progresso}%` }} className="h-full bg-primary"></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-white">{progresso}% Concluído</p>
                    </div>

                    {
                        /*
                            <div>
                              Status: {cours}
                            </div>
                        */
                    }
                    {progresso === 100 && (
                        <FaCheckCircle className="ml-2 text-2xl text-green-500" title="Concluído" />
                    )}


                </div>
                {
                    /*

<div className="flex justify-end">
                    {
                        course.statusPagamento === 'pendente' ?
                            <button className="px-5 py-2 text-xs bg-gray-300 rounded-md dark:text-black hacker  notallowed ">
                                Compra pendente
                            </button>
                            :
                            <Button onClick={() => window.location.href = ROUTE_MY_TRAININGS + '/' + course.id} text="Continuar" rightIcon={FaArrowRight} color="primary" className="text-xs click" />
                    }
                </div>

                    */
                }
            </div>
        </div>
    );
}
