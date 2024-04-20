import { apiSlice } from "../api/apiSlice";

interface createAssignmentBody {
  name: string;
  instructions: string;
  completionTime: string;
  amount: number;
  delivery: string;
  fileIdArray: string[];
}

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<ApiResponseType, createAssignmentBody>({
      query: (data) => ({
        url: "assignments/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    fileUpload: builder.mutation<ApiResponseType, FormData>({
      query: (data) => ({
        url: "file/upload",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllAssignments: builder.query<
      ApiResponseType,
      {
        page?: number;
        limit?: number;
        query?: string;
        sortType?: "asc" | "desc";
        sortBy?: "createdAt" | "status";
        status?: 0 | 1 | 2;
      }
    >({
      query: (arg) => {
        const { page, limit, query, sortType, sortBy, status } = arg;
        return {
          url: `assignments/getAll`,
          params: { page, limit, query, sortType, sortBy, status },
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getApproxAmount:builder.mutation<ApiResponseType,{files:string[]}>({
      query:(data) => ({
        url: "assignments/getApproxAmount",
        method: "POST",
        body: data,
        credentials: "include",
      })
    })
  }),
});

export const {
  useCreateAssignmentMutation,
  useFileUploadMutation,
  useGetAllAssignmentsQuery,
  useGetApproxAmountMutation
} = assignmentApi;
