import Assignments from "@/pages/UserDashboard/Assignments";
import Dashboard from "@/pages/UserDashboard/Dashboard";
import Index from "@/pages/UserDashboard/Index";
import Profile from "@/pages/UserDashboard/Profile";
import CreateAssignment from "@/pages/UserDashboard/CreateAssignment";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Index>
      <Routes>
        <Route path="*" element={<Dashboard/>} />
        <Route path="/asssignments" element={<Assignments/>} />
        <Route path="/create-assignment" element={<CreateAssignment/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Index>
  );
};

export default UserRoutes;
