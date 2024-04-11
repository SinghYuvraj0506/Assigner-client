import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserRoutes from "./Routes/UsersRoutes";
import AuthModelController from "./components/Auth/Index";

function App() {
  return (
    <div>
      <AuthModelController/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        <Route path="/user/*" element={<UserRoutes/>} />
      </Routes>
    </div>
  );
}

export default App;
