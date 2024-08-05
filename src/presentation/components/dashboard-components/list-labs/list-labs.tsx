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
        // Recupera os Treinamentos comprados pelo usuário
        const userDocRef = db.collection('admins').doc(currentUser.uid);
        const userCoursesSnapshot = await userDocRef.collection('courses').where('statusPagamento', '==', 'aprovado').get();
        const purchasedCourses = userCoursesSnapshot.docs.map(doc => doc.id);

        if (purchasedCourses.length === 0) {
          setLabs([]);
          setLoading(false);
          return;
        }

        // Recupera labs que correspondem aos Treinamentos comprados
        const labsSnapshot = await db.collection('labs').where('course_id', 'in', purchasedCourses).get();
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

          <div className="grid 2xl:grid-cols-4 gap-8">


            {labs.map((lab) => (
              <div onClick={() => window.location.href = `${ROUTE_VIRTUAL_LABS + '/' + lab.lab_id}`} key={lab.lab_id} className="dark:bg-slate-100/10 max-w-full hacker dark:border-white/40 relative items-center px-4 py-5 transition-all bg-white border rounded-lg shadow-md cursor-pointer     hacker-div  ">
                <img src={icons.lab} className='absolute w-[7em] dark:opacity-[.2] opacity-[.03]' alt="" />
                <div className="flex flex-wrap justify-between">
                  <h2 className="mb-2 sm:text-4xl  text-4xl font-bold  dark:text-primary hacker text-yellow-700">{lab.lab_name}</h2>
                  <h3 className='tracking-wider flex gap-2 dark:text-primary text-yellow-700'> <img src={svgs.square_svg} className='w-4 my-auto' alt="" /><span className="my-auto font-bold"> {lab.challenges.length} </span> </h3>
                </div>
                <div className="px-2  dark:bg-white/10 rounded-md dark:text-white py-1 text-start bg-gray-100/90 ">
                  <b className="text-xs"><span className="font-bold dark:text-primary text-gray-700">Treinamento:</span> {lab.course_name}</b>
                  <br />
                  {
                    /*

                    <Link to={`/dashboard/labs/${lab.lab_id}`} className="text-yellow-700 dark:text-yellow-300 sm:tracking-wider hacker  underline">
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
            <h2 className="text-gray-500 text-xs sm:text-md hacker dark:text-white/70 lg:w-7/12 mx-auto">
              Não há ainda laboratórios para sí, <a href={ROUTE_TRAININGS} className='underline text-yellow-600'>compre um treinamento</a> para começar com o seu primeiro <b className='hacker'>Laboratório</b>!
            </h2>
          </div>
      }
    </div>

  );
};
