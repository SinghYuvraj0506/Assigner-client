import { apiSlice } from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
    endpoints:(builder) => (
        {
            createAssignment: builder.mutation({
                query:(data) =>({
                    url:"assignments/create",
                    method:"POST",
                    body:data,
                    credentials:"include"
                })
            }),
            fileUpload: builder.mutation({
                query:(data) =>({
                    url:"file/upload",
                    method:"POST",
                    body:data,
                    credentials:"include"
                })
            }),
            getAllAssignments: builder.query({
                query:({query,sortType,sortBy,status,page,limit}) =>({
                    url:`assignments/getAll`,
                    method:"GET",
                    credentials:"include"
                })
            }),
        }
    )
})

export const {useCreateAssignmentMutation,useFileUploadMutation} = assignmentApi;
