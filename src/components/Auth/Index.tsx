import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import Verification from "./Verification";
import Login from "./Login";
import DialogWrapper from "@/lib/HOC/DialogWrapper";
import {
  ChangeAuthModalStatus,
  GeneralStateInterface,
} from "@/app/features/general/GeneralSlice";

const Index = () => {
  const generalState: GeneralStateInterface = useSelector(
    (state) => state.general
  );

  return (
    <div>
      {generalState.modalType === "SignUp" ? (
        <Signup />
      ) : generalState.modalType === "Verification" ? (
        <Verification />
      ) : (
        <Login />
      )}
    </div>
  );
};

const AuthModelController = () => {
  const generalState: GeneralStateInterface = useSelector(
    (state) => state.general
  );
  const dispatch = useDispatch();
  const EnhancedComponent = DialogWrapper(
    Index,
    generalState.openAuthModal,
    () => {
      dispatch(ChangeAuthModalStatus({ value: false }));
    }
  );

  return <EnhancedComponent />;
};

export default AuthModelController;
