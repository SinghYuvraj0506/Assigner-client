import {
  useCreateAssignmentMutation,
  useFileUploadMutation,
} from "@/app/features/assignments/assignmentApi";
import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardWrapper from "@/lib/HOC/DashboardWrapper";
import { ACCEPTED_FILE_TYPES } from "@/lib/constants";
import useApiFeedback from "@/lib/hooks/useApiFeedback";
import { createAssigmentSchema } from "@/schemas/Assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uploadedFileArray, setUploadedFileArray] = useState(null);

  const [fileUpload, { isLoading, isError, isSuccess, error, data }] =
    useFileUploadMutation();

  const [
    createAssignment,
    {
      isLoading: isLoading2,
      isError: isError2,
      isSuccess: isSuccess2,
      error: error2,
      data: data2,
    },
  ] = useCreateAssignmentMutation();

  const form = useForm({
    resolver: zodResolver(createAssigmentSchema),
    defaultValues: {
      name: "",
      instructions: "",
      completionTime: new Date(Date.now() + 86400000).toLocaleDateString(),
      amount: 30,
      delivery: "",
      files: [],
    },
  });

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "File Uploaded",
    undefined,
    error?.data?.message || "Something went wrong"
  );

  useApiFeedback(
    isSuccess2,
    isLoading2,
    error2,
    data2?.message || "Assignment Created Successfully",
    undefined,
    error2?.data?.message || "Something went wrong",
    ()=>{dispatch(ChangeModalStatus({value:true,type:"SuccessCreation"}));navigate("/user")}
  );


  async function onSubmit(values: z.infer<typeof createAssigmentSchema>) {
    let fileArray = [];
    if (!uploadedFileArray) {
      const formData = new FormData();
      formData.append("usage", "assignments");

      for (let index = 0; index < values?.files?.length; index++) {
        const element = values?.files[index];
        formData.append("files", element);
      }

      const result = await fileUpload(formData);
      fileArray = result?.data?.data;
      setUploadedFileArray(result?.data?.data);
    }

    await createAssignment({
      name: values?.name,
      instructions: values?.instructions,
      completionTime: values?.completionTime,
      amount: values?.amount,
      delivery: values?.delivery,
      fileIdArray: uploadedFileArray ?? data?.data ?? fileArray ,
    });
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={()=>form.reset()}
        className="w-3/4 h-full flex flex-col gap-8 "
      >
        <div>
          <FormField
            control={form?.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignment Name</FormLabel>
                <FormControl>
                  <Input placeholder="Assignment 01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form?.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Assignment 01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-20">
          <FormField
            control={form?.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Files</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Assignment 01"
                    type="file"
                    multiple
                    accept={ACCEPTED_FILE_TYPES.join(",")}
                    onChange={(e) => {
                      setUploadedFileArray(null)
                      const filesArray = Array.from(e.target.files || []);
                      field.onChange(filesArray);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form?.control}
            name="completionTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion Date</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-20">
          <FormField
            control={form?.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="30" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="delivery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="DSEU Okhla 2 Campus"
                    type="type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="reset" className="w-max">
            Reset
          </Button>
          <Button type="submit" className="w-max">
            Save and Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

const NewComponent = DashboardWrapper(CreateAssignment, "Create Assignment");

export default NewComponent;
