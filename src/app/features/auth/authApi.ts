import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
                        user:result.data.data
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})



export const {useRegisterUserMutation} = authApi;