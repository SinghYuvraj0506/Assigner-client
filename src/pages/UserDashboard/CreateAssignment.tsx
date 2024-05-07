import {
  useCreateAssignmentMutation,
  useFileUploadMutation,
  useGetApproxAmountMutation,
} from "@/app/features/assignments/assignmentApi";
import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import useAuth from "@/lib/hooks/useAuth";
import { createAssigmentSchema } from "@/schemas/Assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import mixpanel from "mixpanel-browser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedFileArray, setUploadedFileArray] = useState(null);
  const [amountStatus, setAmountStatus] = useState(false);
  
  const {user} = useAuth()

  const [fileUpload, { isLoading, isSuccess, error, data }] =
    useFileUploadMutation();

  const [
    getApproxAmount,
    {
      isLoading: amountLoading,
      error: amountError,
      isSuccess: amountSuccess,
      data: amountData,
    },
  ] = useGetApproxAmountMutation();

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
      amount: "xx",
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
    () => {
      dispatch(ChangeModalStatus({ value: true, type: "SuccessCreation" }));
      navigate("/user");
    }
  );

  useApiFeedback(
    amountSuccess,
    amountLoading,
    amountError,
    amountData?.message || "Amount Calculated successfully",
    "Calculating the amount...",
    amountError?.data?.message || "Something went wrong",
    () => {
      setAmountStatus(true);
      if(!isNaN(amountData?.data?.amount)){
        form.setValue("amount",amountData?.data?.amount)
      }
      else{
        toast.error("Problem while calculating the amount, we will inform you soon, Please submit your assignment")
      }
    }
  );

  async function onSubmit(values: z.infer<typeof createAssigmentSchema>) {
    mixpanel.track("Submit Assignment clicked",{
      name:values?.name,
      amount:values?.amount
    })

    if (!uploadedFileArray) {
      const formData = new FormData();
      formData.append("usage", "assignments");

      for (let index = 0; index < values?.files?.length; index++) {
        const element = values?.files[index];
        formData.append("files", element);
      }

      const result = await fileUpload(formData);
      setUploadedFileArray(result?.data?.data);
      await getApproxAmount({ files: result?.data?.data });

    } else {
      if (amountStatus) {
        await createAssignment({
          name: values?.name,
          instructions: values?.instructions,
          completionTime: values?.completionTime,
          amount: form.getValues("amount") ?? null,
          delivery: values?.delivery,
          fileIdArray: uploadedFileArray ?? data?.data,
        });
      }
    }
  }

  const handleSampleCopy = () =>{
    mixpanel.track("Sample instructions copy")

    const sampleInstructions = `
      Name - John Snow,
      Roll no - 2312312312,
      Branch - Mechanical Engg (5th Sem)
      Subject - Engineering Physics
      Assignment - 1
    `

    form.setValue("instructions",sampleInstructions)
  }


  const handleCopyInstitute = () =>{
    mixpanel.track("copy institute to delivery")
    form.setValue("delivery",user?.institute?.name ?? "")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => {form.reset(); mixpanel.track("Reset Assignment clicked")}}
        className="w-full md:w-3/4 h-full flex flex-col gap-8 "
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
                <FormLabel>Instructions (<span className="cursor-pointer hover:text-blue-600" onClick={handleSampleCopy}>Copy Sample</span>)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Assignment 01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-rows-1 md:grid-cols-2 gap-8 md:gap-20">
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
                      setUploadedFileArray(null);
                      form.setValue("amount","")
                      const filesArray = Array.from(e.target.files || []);
                      field.onChange(filesArray);
                    }}
                  />
                </FormControl>
                <FormDescription>Max file size allowed is 10MB</FormDescription>
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

        <div className="grid grid-rows-1 md:grid-cols-2 gap-8 md:gap-20">
          <FormField
            control={form?.control}
            name="delivery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address (<span className="cursor-pointer hover:text-blue-600" onClick={handleCopyInstitute}>Deliver to your institute</span>)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address of Delivery....."
                    type="type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="xx" type="number" {...field} disabled/>
                </FormControl>
                <FormDescription>This is an autogenerated & estimated value and may change on negotiation.</FormDescription>
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
            {amountStatus ? "Save and Submit" : "Calculate the amount"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const NewComponent = DashboardWrapper(CreateAssignment, "Create Assignment");

export default NewComponent;
