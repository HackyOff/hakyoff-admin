import { Route, Routes } from "react-router-dom";
//import { useState, useEffect } from "react";
//import { Preloader } from "./components";
import { LoginPage } from "./pages/login/login-page";
import ProtectedRoute from "../context/protected-route";
import { Dashboard } from "./pages/dashboard/dashboard";
import { ROUTE_DASHBOARD, ROUTE_VIRTUAL_LABS, ROUTE_CTFS, ROUTE_MY_TRAININGS, ROUTE_NEWS, ROUTE_TICKETS, ROUTE_HACKING, ROUTE_SETTINGS, ROUTE_TRAININGS, ROUTE_MY_CERTIFICATES, ROUTE_PROFILE, ROUTE_RESET_PASS_CONFIRM, ROUTE_RESET_PASS, ROUTE_MINI_DASHBOARD, ROUTE_ADD_COURSE, ROUTE_COUPON, ROUTE_NEWS_ADMIN, ROUTE_TRAINERS } from "../utils/sidebar-utils";
import { Ctfs } from "./pages/sidebar-pages/ctfs";
import { Hacking } from "./pages/sidebar-pages/hacking";
import { VirtualLabs } from "./pages/sidebar-pages/lab-virtual";
import { MyTrainings } from "./pages/sidebar-pages/my-trainings";
import { News } from "./pages/sidebar-pages/news";
import { Settings } from "./pages/sidebar-pages/settings";
import { Tickets } from "./pages/sidebar-pages/tickets";
import Trainings from "./pages/sidebar-pages/trainings";
import { SoonPage } from "./pages/soon/soon";
import { MyCertificates } from "./pages/sidebar-pages/my-certificates";
import { ProfilePage } from "./pages/sidebar-pages/profile-page";
import AddCtfForm from "./pages/admin-pages/add-ctfs";
import { PasswordResetConfirm } from "./pages/reset-password-confirm/reset-password-confirm";
import { PasswordResetRequest } from "./pages/password-reset/password-reset";
import { AddLabForm } from "./pages/admin-pages/add-labs";
import { LabChallenges } from "./components/dashboard-components/lab-challenges/labs-challenges";
import { TransactionDashboard } from "./pages/admin-pages/dashboard-transactions";
import TrainingsDataComponent from "./pages/admin-pages/td-c";
import CourseDetail from "./pages/admin-pages/course-details";
import { AddCoursePage } from "./pages/admin-pages/add-courses";
import { NewsDetailsPage } from "./pages/news-details/news-details";
import { CouponForm } from "./components/dashboard-components/cupom-components/cupom-form";
import { TrainingDetail } from "./pages/sidebar-pages/training_detail";
import AddTrainerPage from "./pages/admin-pages/add-trainer";
import { ContinueLesson } from "./pages/sidebar-pages/lesson-continue";
import VerifyEmail from "./pages/verify-email/verify-email";
import { ConfirmEmailAccount } from "./pages/reset-password-confirm/confirm-email";
import { NotFound } from "./pages/notfound/not-found";
import { AddNewsPage } from "./pages/admin-pages/add-news-page";
import { Cupons } from "./pages/sidebar-pages/cupons";
import { NewsAdminPage } from "./pages/sidebar-pages/news-amin-page";
import { TrainersPage } from "./pages/sidebar-pages/trainers";

export function AppRoutes() {

  //const [isLoading, setIsLoading] = useState(true); 
  // Configurando cookies úteis para SEO e desempenho
  /*
    useEffect(() => { 
      setTimeout(() => {
        setIsLoading(false);  
      }, 4000); 
    }, []);
  */


  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/soon" element={<SoonPage />} />
        <Route path="/admin-ctf" element={<AddCtfForm />} />
        <Route path={ROUTE_MINI_DASHBOARD} element={<TransactionDashboard />} />
        <Route path="/admin-labss" element={<AddLabForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/add-cupom" element={<CouponForm />} />
        <Route path="/add-trainer" element={<AddTrainerPage />} />
        <Route path={'/news' + '/:id'} element={<NewsDetailsPage />} />
        <Route path="/verify-email" Component={VerifyEmail} />
        <Route path="/test" element={<TrainingsDataComponent />} />
        <Route path="/add-news" element={<AddNewsPage />} />

        <Route path="/test/:id" Component={CourseDetail} />
        <Route path={ROUTE_RESET_PASS} element={<PasswordResetRequest />} />
        <Route path={ROUTE_ADD_COURSE} element={<AddCoursePage />} />
        <Route path={'/confirm-email'} element={<ConfirmEmailAccount />} />
        <Route path={ROUTE_RESET_PASS_CONFIRM} element={<PasswordResetConfirm />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path={ROUTE_DASHBOARD} Component={Dashboard} />
          <Route path={ROUTE_TRAINERS} Component={TrainersPage} />
          <Route path={ROUTE_COUPON} Component={Cupons} />
          <Route path={ROUTE_NEWS_ADMIN} Component={NewsAdminPage} />
          <Route path={ROUTE_VIRTUAL_LABS} Component={VirtualLabs} />
          <Route path={ROUTE_MY_CERTIFICATES} Component={MyCertificates} />
          <Route path={ROUTE_VIRTUAL_LABS + "/:labId"} Component={LabChallenges} />
          <Route path={ROUTE_CTFS} Component={Ctfs} />
          <Route path={ROUTE_TRAININGS} Component={Trainings} />
          <Route path={ROUTE_TRAININGS + '/:id_course'} Component={TrainingDetail} />
          <Route path={ROUTE_MY_TRAININGS + '/:id_course'} Component={ContinueLesson} />
          <Route path={ROUTE_MY_TRAININGS} Component={MyTrainings} />
          <Route path={ROUTE_NEWS} Component={News} />
          <Route path={ROUTE_TICKETS} Component={Tickets} />
          <Route path={ROUTE_PROFILE} Component={ProfilePage} />
          <Route path={ROUTE_HACKING} Component={Hacking} />
          <Route path={ROUTE_SETTINGS} Component={Settings} />
        </Route>
      </Routes>
    </>
  );
}
