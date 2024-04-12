import { useEffect } from "react";
import toast from "react-hot-toast";

const useApiFeedback = (
  isSuccess: boolean,
  isLoading: boolean,
  error: any,
  successMessage: string,
  loadingMessage?: string,
  errorMessage: string,
  successCallback?: () => void
) => {
  useEffect(() => {
    if (isLoading) {
      toast.loading(loadingMessage || "Please wait...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage);
      successCallback && successCallback();
    }

    if (error) {
      toast.error(errorMessage);
    }
  }, [error, isSuccess]);
};

export default useApiFeedback;
