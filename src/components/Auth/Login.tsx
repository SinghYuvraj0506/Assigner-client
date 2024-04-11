import React from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeAuthModalStatus } from "@/app/features/general/GeneralSlice";

const Login: React.FC = () => {

  const dispatch = useDispatch()

  return (
    <Card className="mx-auto w-[30vw]">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>
          Enter your information to access you account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
          <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have account?{" "}
          <span className="underline cursor-pointer" onClick={()=>{dispatch(ChangeAuthModalStatus({value:true,type:"SignUp"}))}}>
            Sign Up
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
