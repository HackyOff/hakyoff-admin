import "./App.css";
import "./presentation/theme/global.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./presentation/app.routes";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" toastOptions={{ duration: 6000 }} />

          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
