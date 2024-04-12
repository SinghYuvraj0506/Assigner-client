import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { ChangeAuthModalStatus } from "@/app/features/general/GeneralSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupUserSchema } from "@/schemas/Auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterUserMutation } from "@/app/features/auth/authApi";
import useApiFeedback from "@/lib/hooks/useApiFeedback";

const Signup = () => {
  const dispatch = useDispatch();
  const [registerUser, { isSuccess, error, data,isLoading }] =
    useRegisterUserMutation();

  const form = useForm({
    resolver: zodResolver(SignupUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "Verify your email address",
    undefined,
    error?.data?.message || "Something went wrong",
    () => dispatch(ChangeAuthModalStatus({ value: true, type: "Verification" }))
  );

  async function onSubmit(values: z.infer<typeof SignupUserSchema>) {
    await registerUser(values);
  }

  const handleGoogle = () =>{
    window.open(`${import.meta.env.VITE_HOST_URL}/auth/google`,"_self")
  }

  return (
    <Card className="mx-auto w-[30vw]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form?.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Snow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Sign up with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              dispatch(ChangeAuthModalStatus({ value: true, type: "Login" }));
            }}
          >
            Sign in
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;
