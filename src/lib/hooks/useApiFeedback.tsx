import { useEffect } from "react";
import toast from "react-hot-toast";
import "../../App.css"

const useApiFeedback = (
  isSuccess?: boolean,
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

  // Additional useEffect to handle screen disabling and fade effect
  useEffect(() => {
    const body = document.body;
    if (isLoading) {
      body.classList.add("loading-overlay");
    } 
    else {
      body.classList.remove("loading-overlay");
    }
  }, [isLoading]);

};

export default useApiFeedback;
