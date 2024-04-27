import { Store } from "@/app/Store";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";
import { EditProfileSchema } from "@/schemas/Profile";
import { LoginUserSchema, SignupUserSchema } from "@/schemas/Auth";
import { z } from "zod";
import mixpanel from "mixpanel-browser";

interface ValidateUser {
  token: string;
  code: string;
}

interface SocialAuthUser {
  email: string;
  fullName: string;
  signInFrom: "google" | "email";
}

interface LoginUser extends z.infer<typeof LoginUserSchema> {
  signInFrom: "google" | "email";
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      ApiResponseType,
      z.infer<typeof SignupUserSchema>
    >({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result?.data?.data?.token,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation<
      ApiResponseType,
      z.infer<typeof EditProfileSchema>
    >({
      query: (data) => ({
        url: "users/updateProfile",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          await Store.dispatch(
            apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    validateUser: builder.mutation<ApiResponseType, ValidateUser>({
      query: ({ token, code }) => ({
        url: "users/validateAccount",
        method: "POST",
        body: {
          token,
          code,
        },
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("isAuthenticated", "true");
          mixpanel.identify(result?.data?.data?.user?.email);
          mixpanel.people.set_once({
            $first_name: result?.data?.data?.user?.fullName?.split(" ")[0],
            $last_name: result?.data?.data?.user?.fullName?.split(" ")[1],
            $email: result?.data?.data?.user?.email,
          });
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    socialAuthUser: builder.mutation<ApiResponseType, SocialAuthUser>({
      query: ({ email, fullName, signInFrom }) => ({
        url: "users/socialAuthRegister",
        method: "POST",
        body: {
          email,
          fullName,
          signInFrom,
        },
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("isAuthenticated", "true");
          mixpanel.identify(result?.data?.data?.user?.email);
          mixpanel.people.set_once({
            $first_name: result?.data?.data?.user?.fullName?.split(" ")[0],
            $last_name: result?.data?.data?.user?.fullName?.split(" ")[1],
            $email: result?.data?.data?.user?.email,
          });
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<ApiResponseType, LoginUser>({
      query: ({ email, password, signInFrom }) => ({
        url: "users/login",
        method: "POST",
        body: {
          email,
          password,
          signInFrom,
        },
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("isAuthenticated", "true");
          mixpanel.identify(result?.data?.data?.user?.email);
          mixpanel.people.set_once({
            $first_name: result?.data?.data?.user?.fullName?.split(" ")[0],
            $last_name: result?.data?.data?.user?.fullName?.split(" ")[1],
            $email: result?.data?.data?.user?.email,
          });
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<ApiResponseType, null>({
      query: () => ({
        url: "users/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("isAuthenticated");
          mixpanel.reset();
          dispatch(userLoggedOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useValidateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useSocialAuthUserMutation,
  useUpdateUserMutation,
} = authApi;
