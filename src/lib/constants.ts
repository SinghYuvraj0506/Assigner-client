export const MAX_UPLOAD_SIZE = 1024 * 1024 * 50; // 50MB

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];


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

export interface Assignment{
  _id:string,
  name:string,
  instructions:string,
  completionTime:string,
  createdAt:string,
  amount:number | string | null,
  status : 1 | 2,
  files:FilesSchema[]
}

export interface User{
  _id:string,
  fullName:string,
  email:string,
  status:0|1,
  isVerified:true,
  phone:number,
  institute:{
      _id:string,name:string
  },
  location:{latitude:number,longitude:number}
}

export interface AuthState{
  token:string,
  user:null | User
}

export interface AssignmentResponse{
  statusCode:number,
  data: {
    count:number,
    limit:number,
    page:number,
    data:Assignment[]
  },
  message:string,
  success:boolean,
  error?:any
}

export interface ApiResponseType {
  statusCode:number,
  data: any,
  message:string,
  success:boolean,
  error?:any
}
