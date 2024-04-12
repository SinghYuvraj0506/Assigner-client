import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserRoutes from "./Routes/UsersRoutes";
import AuthModelController from "./components/Auth/Index";
import { Toaster } from "react-hot-toast";
import Check from "./pages/UserDashboard/Check";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthModelController />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login/check" element={<Check />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/user/*" element={<ProtectedRoute><UserRoutes /></ProtectedRoute>} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
