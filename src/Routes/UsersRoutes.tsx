import Assignments from "@/pages/UserDashboard/Assignments";
import Dashboard from "@/pages/UserDashboard/Dashboard";
import Index from "@/pages/UserDashboard/Index";
import Profile from "@/pages/UserDashboard/Profile";
import CreateAssignment from "@/pages/UserDashboard/CreateAssignment";
import { Route, Routes, useLocation } from "react-router-dom";
import useAuth from "@/lib/hooks/useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UserRoutes = () => {
  const { user } = useAuth();
  const location = useLocation()

  useEffect(() => {
    if(user && !user?.phone){
      toast.error("Fill the profile, to access the platform")
    }
  }, [location,user])
  

  return (
    <Index>
      <Routes>
        {user && !user?.phone ? (
          <Route path="*" element={<Profile />} />
        ) : (
          <>
            <Route path="*" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </Index>
  );
};

export default UserRoutes;
