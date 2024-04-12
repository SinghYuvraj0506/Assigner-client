import { AuthState } from "@/app/features/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { user,token }: AuthState = useSelector((state: any) => state.auth);

  return {
    isAuthenticated:localStorage.getItem("isAuthenticated") ? true : false,
    user,
    token
  }

};

export default useAuth;
