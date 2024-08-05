import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth-context';
import { extra } from '@/utils/image-exporter';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="relative grid w-full items-center bg-black h-screen preloader-container place-content-center">
        <div className="z-10 text-center">
          <img
            src={extra.loader_circle}
            className="w-[6em] mx-auto mb-4"
            alt=""
          />
          <p className="text-2xl font-bold text-primary hacker">
            Carregando HakyOff...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (!currentUser.emailVerified) {
    return <Navigate to="/confirm-email" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
