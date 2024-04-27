
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilesSchema{
    _id:string,
    fileUrl: string,
    fileName: string,
    fileType: "image/jpeg"|
    "image/jpg" |
    "image/png" |
    "application/pdf",
    status: 1
}
interface Assignment{
    _id:string,
    name:string,
    instructions:string,
    completionTime:string,
    createdAt:string,
    amount:number | string | null,
    status : 1 | 2,
    files:FilesSchema[]
}

interface AssignmentState{
    assignments:Assignment[]
}

const initialState:AssignmentState = {
    assignments:[]
}

export const assignmentSlice = createSlice({
    name:"assignments",
    initialState,
    reducers:{
        setAssignments:(state,action:PayloadAction<{data:any}>) =>{
            state.assignments = action.payload.data;
        }
    }
})