import { useLogoutUserMutation } from "@/app/features/auth/authApi";
import { ChangeAuthModalStatus } from "@/app/features/general/GeneralSlice";
import useAuth from "@/lib/hooks/useAuth";
import React from "react";
import { useDispatch } from "react-redux";

const Main: React.FC = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const {isAuthenticated,user} = useAuth()

  return (
    <div>
      This is landing page of Aalas
      <br />
      Hi, {user?.fullName}
      <br />
      <br />
      {isAuthenticated ? (
        <button onClick={async () => await logoutUser()}>Logout</button>
      ) : (
        <button
          onClick={() => dispatch(ChangeAuthModalStatus({ value: true }))}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Main;
