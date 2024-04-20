import { useDispatch, useSelector } from "react-redux";
import Signup from "./Auth/Signup";
import Verification from "./Auth/Verification";
import Login from "./Auth/Login";
import DialogWrapper from "@/lib/HOC/DialogWrapper";
import { ChangeModalStatus, GeneralStateInterface } from "@/app/features/general/GeneralSlice";
import Success from "./Success";

const Index = () => {
  const generalState: GeneralStateInterface = useSelector(
    (state:any) => state.general
  );

  return (
    <div>
      {generalState.modalType === "SignUp" ? (
        <Signup />
      ) : generalState.modalType === "Verification" ? (
        <Verification />
      ) : generalState.modalType === "Login" ? (
        <Login />
      ) : generalState.modalType === "SuccessCreation" ? (
        <Success />
      ) : null}
    </div>
  );
};

const ModelController = () => {
  const generalState: GeneralStateInterface = useSelector(
    (state) => state.general
  );
  const dispatch = useDispatch();
  const EnhancedComponent = DialogWrapper(Index, generalState.openModal, () => {
    dispatch(ChangeModalStatus({ value: false }));
  });

  return <EnhancedComponent />;
};

export default ModelController;
