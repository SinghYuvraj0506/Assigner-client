import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        registerUser : builder.mutation({
            query: (data) => ({
                url:"users/register",
                method:"POST",
                body:data,
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({
                       token:result?.data?.data?.token
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        validateUser : builder.mutation({
            query: ({token,code}) => ({
                url:"users/validateAccount",
                method:"POST",
                body:{
                    token,code
                },
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("isAuthenticated","true")
                    dispatch(userLoggedIn({
                       accessToken:result?.data?.data?.accessToken,
                        user:result?.data?.data?.user
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        socialAuthUser : builder.mutation({
            query: ({email,fullName,signInFrom}) => ({
                url:"users/socialAuthRegister",
                method:"POST",
                body:{
                    email,fullName,signInFrom
                },
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("isAuthenticated","true")
                    dispatch(userLoggedIn({
                       accessToken:result?.data?.data?.accessToken,
                       user:result?.data?.data?.user
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        loginUser : builder.mutation({
            query: ({email,password,signInFrom}) => ({
                url:"users/login",
                method:"POST",
                body:{
                    email,password,signInFrom
                },
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("isAuthenticated","true")
                    dispatch(userLoggedIn({
                       accessToken:result?.data?.data?.accessToken,
                        user:result?.data?.data?.user
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        logoutUser : builder.mutation({
            query: (data) => ({
                url:"users/logout",
                method:"POST",
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    await queryFulfilled;
                    localStorage.removeItem("isAuthenticated")
                    dispatch(userLoggedOut())
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})



export const {useRegisterUserMutation,useValidateUserMutation,useLoginUserMutation,useLogoutUserMutation,useSocialAuthUserMutation} = authApi;