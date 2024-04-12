
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../auth/authSlice"

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_HOST_URL+"/api/v1",
    }),
    endpoints: (builder) => ({
        refershToken:builder.query({
            query:(data) => ({
                url:"/users/refreshToken",
                method:"GET",
                credentials:"include"
            })
        }),
        loadUser:builder.query({
            query:(data) => ({
                url:"/users/me",
                method:"GET",
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({
                        accessToken:result?.data?.data?.accessToken,
                        user:result?.data?.data?.user
                    }))
                    
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})
