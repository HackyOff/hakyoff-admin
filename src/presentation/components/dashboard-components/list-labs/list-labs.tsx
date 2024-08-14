// ListLabs.tsx
import { useAuth } from '@/context/auth-context';
import { db } from '@/domain/config/firebase';
import { IMLab } from '@/domain/models/labs-model';
import { icons, svgs } from '@/utils/image-exporter';
import React, { useEffect, useState } from 'react';
import { renderLabsSkeletons } from '../../../../utils/skeleton-labs';
import { FaFilter } from 'react-icons/fa6';
import { ROUTE_TRAININGS, ROUTE_VIRTUAL_LABS } from '../../../../utils/sidebar-utils';

export const ListLabs: React.FC = () => {
  const [labs, setLabs] = useState<IMLab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth(); // Obtendo o usuário atual

  useEffect(() => {
    const fetchLabs = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {

        /*
        // Recupera os Treinamentos comprados pelo usuário
        const userDocRef = db.collection('alunos').doc(currentUser.uid);
        const userCoursesSnapshot = await userDocRef.collection('courses').where('statusPagamento', '==', 'aprovado').get();
        const purchasedCourses = userCoursesSnapshot.docs.map(doc => doc.id);

        if (purchasedCourses.length === 0) {
          setLabs([]);
          setLoading(false);
          return;
        }
*/
        // Recupera labs que correspondem aos Treinamentos comprados
        const labsSnapshot = await db.collection('labs').get();
        const labsData = labsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as IMLab[];
        setLabs(labsData);
      } catch (error) {
        console.error('Erro ao buscar labs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [currentUser]);

  if (loading) {
    return renderLabsSkeletons(9);
  }



  return (
    <div>
      {
        labs.length > 0 ?

          <div className="grid gap-8 2xl:grid-cols-4">


            {labs.map((lab) => (
              <div onClick={() => window.location.href = `${ROUTE_VIRTUAL_LABS + '/' + lab.lab_id}`} key={lab.lab_id} className="relative items-center max-w-full px-4 py-5 transition-all bg-white border rounded-lg shadow-md cursor-pointer dark:bg-slate-100/10 hacker dark:border-white/40 hacker-div ">
                <img src={icons.lab} className='absolute w-[7em] dark:opacity-[.2] opacity-[.03]' alt="" />
                <div className="flex flex-wrap justify-between">
                  <h2 className="mb-2 text-4xl font-bold text-yellow-700 sm:text-4xl dark:text-primary hacker">{lab.lab_name}</h2>
                  <h3 className='flex gap-2 tracking-wider text-yellow-700 dark:text-primary'> <img src={svgs.square_svg} className='w-4 my-auto' alt="" /><span className="my-auto font-bold"> {lab.challenges.length} </span> </h3>
                </div>
                <div className="px-2 py-1 rounded-md dark:bg-white/10 dark:text-white text-start bg-gray-100/90 ">
                  <b className="text-xs"><span className="font-bold text-gray-700 dark:text-primary">Treinamento:</span> {lab.course_name}</b>
                  <br />
                  {
                    /*

                    <Link to={`/dashboard/labs/${lab.lab_id}`} className="text-yellow-700 underline dark:text-yellow-300 sm:tracking-wider hacker">
                    Ver Desafios
                  </Link>


                    */

                  }
                </div>
              </div>
            ))}
          </div>
          :
          <div className="bg-white dark:bg-slate-100/10 mt-10 text-center rounded-lg shadow w-full sm:py-[10rem] py-[5rem] px-5">
            <FaFilter className='mx-auto text-gray-500 sm:text-9xl text-7xl' />
            <br />
            <br />
            <h2 className="mx-auto text-xs text-gray-500 sm:text-md hacker dark:text-white/70 lg:w-7/12">
              Não há ainda laboratórios para sí, <a href={ROUTE_TRAININGS} className='text-yellow-600 underline'>compre um treinamento</a> para começar com o seu primeiro <b className='hacker'>Laboratório</b>!
            </h2>
          </div>
      }
    </div>

  );
};
