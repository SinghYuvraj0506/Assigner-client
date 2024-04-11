
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import Verification from "./Verification";
import Login from "./Login";
import DialogWrapper from "@/lib/HOC/DialogWrapper";
import { ChangeAuthModalStatus } from "@/app/features/general/GeneralSlice";

const Index = () => {
  const generalState = useSelector((state) => state.general);

  return (
    <div>
      {generalState?.ModalType === "SignUp" ? (
        <Signup />
      ) : generalState?.ModalType === "Verification" ? (
        <Verification />
      ) : (
        <Login />
      )}
    </div>
  );
};

const AuthModelController = () => {
    const generalState = useSelector((state) => state.general);
    const dispatch = useDispatch();
    const EnhancedComponent = DialogWrapper(Index, generalState?.openAuthModal, () => {
      dispatch(ChangeAuthModalStatus({ value: false }));
    });

    return <EnhancedComponent />;
}

export default AuthModelController;
