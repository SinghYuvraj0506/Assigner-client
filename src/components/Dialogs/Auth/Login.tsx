import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "@/schemas/Auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginUserMutation } from "@/app/features/auth/authApi";
import useApiFeedback from "@/lib/hooks/useApiFeedback";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loginUser, { isSuccess, error, data, isLoading }] =
    useLoginUserMutation();

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "Logged In Successfully",
    undefined,
    error?.data?.message || "Something went wrong",
    () => {dispatch(ChangeModalStatus({ value: false }));navigate("/user")}
  );


  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginUserSchema>) {
    await loginUser({
      email: values?.email,
      password: values?.password,
      signInFrom: "email",
    });
  }

  const handleGoogle = () => {
    window.open(`${import.meta.env.VITE_HOST_URL}/auth/google`, "_self");
  };

  return (
    <Card className="mx-auto w-[85vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>
          Enter your information to access you account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                  <FormLabel>
                    {" "}
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don't have account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              dispatch(ChangeModalStatus({ value: true, type: "SignUp" }));
            }}
          >
            Sign Up
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
