
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificationUserSchema } from "@/schemas/Auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useValidateUserMutation } from "@/app/features/auth/authApi";
import { useDispatch } from "react-redux";
import useApiFeedback from "@/lib/hooks/useApiFeedback";
import { useNavigate } from "react-router-dom";
import { ChangeAuthModalStatus } from "@/app/features/general/GeneralSlice";
import useAuth from "@/lib/hooks/useAuth";

const Verification = () => {
  const [validateUser,{isSuccess,error,data,isLoading}] = useValidateUserMutation();
  const {token} = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "Registration Successfull",
    undefined,
    error?.data?.message || "Something went wrong",
    () => {navigate("/user");
    dispatch(ChangeAuthModalStatus({ value: false }))}
  );

  const form = useForm({
    resolver: zodResolver(VerificationUserSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof VerificationUserSchema>) {
    await validateUser({
        token:token,
        code:values?.code
    })

  }

  return (
    <Card className="mx-auto w-[30vw]">
      <CardHeader>
        <CardTitle className="text-xl">Account Verification</CardTitle>
        <CardDescription>
          Please enter the activation code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
            <FormField
              control={form?.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex items-center w-full flex-col gap-3">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormLabel className="w-full">
                    {" "}
                    <div className="flex items-center justify-between w-full">
                      <span className="inline-block text-sm text-red-600">
                        Code valid for 5 minutes
                      </span>
                      <span className="inline-block text-sm underline cursor-pointer">
                        Resend Code
                      </span>
                    </div>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className="w-full">
            Verify
          </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Verification;
