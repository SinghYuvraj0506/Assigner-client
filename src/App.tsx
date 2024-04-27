import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import UserRoutes from "./Routes/UsersRoutes";
import ModelController from "./components/Dialogs/Index";
import { Toaster } from "react-hot-toast";
import Check from "./pages/UserDashboard/Check";
import ProtectedRoute from "./lib/ProtectedRoute";
import Pricing from "./pages/Pricing";
import mixpanel from 'mixpanel-browser';
import { useEffect } from "react";


function App() {
  const location = useLocation()
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {debug: true, persistence: 'localStorage'});


  useEffect(() => {
    mixpanel.track_pageview({})
  }, [location])
  

  return (
    <div>
      <ModelController />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login/check" element={<Check />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/user/*" element={<ProtectedRoute><UserRoutes /></ProtectedRoute>} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
