import { useSocialAuthUserMutation } from "@/app/features/auth/authApi";
import Loader from "@/components/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Check = () => {
  const [socialAuthUser, { error, isSuccess, data }] =
    useSocialAuthUserMutation();

  useEffect(() => {
    checkGoogleLogin().then((response) => {
      if (response?.statusCode === 200) {
        const { email, name, signInFrom } = response?.data;
        socialAuthUser({ email, fullName: name, signInFrom }).then(() => {
          console.log("Social AUth done....");
        });
      } else {
        window.open("/", "_self");
      }
    });
  }, []);

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message || "Logged In Successfully");
      setTimeout(() => {
        window.open("/", "_self");
      }, 1500);
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [error, isSuccess, data]);

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
