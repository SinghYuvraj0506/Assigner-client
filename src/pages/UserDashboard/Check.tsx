import { useSocialAuthUserMutation } from "@/app/features/auth/authApi";
import Loader from "@/components/Loader";
import useApiFeedback from "@/lib/hooks/useApiFeedback";
import { useEffect } from "react";

const Check = () => {
  const [socialAuthUser, { error, isSuccess, data,isLoading }] =
    useSocialAuthUserMutation();

  useEffect(() => {
    checkGoogleLogin().then((response) => {
      if (response?.statusCode === 200) {
        const { email, name, signInFrom } = response?.data;
        socialAuthUser({ email, fullName: name, signInFrom }).then(() => {});
      } else {
        window.open("/", "_self");
      }
    });
  }, []);

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "Logged In Successfully",
    undefined,
    error?.data?.message || "Something went wrong",
    () => {setTimeout(() => {
      window.open("/user", "_self");
    }, 500)}
  );

  const checkGoogleLogin = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_HOST_URL + "/auth/google/success",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen items-center justify-center flex">
        <Loader/>
    </div>
  );
};

export default Check;
