
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
import { useDispatch } from 'react-redux'
import { ChangeAuthModalStatus } from '@/app/features/general/GeneralSlice'


const Signup = () => {
  const dispatch = useDispatch()

  return (
    <Card className="mx-auto w-[30vw]">
    <CardHeader>
      <CardTitle className="text-xl">Sign Up</CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="last-name">Full name</Label>
            <Input id="last-name" placeholder="Robinson" required />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <span className="underline cursor-pointer" onClick={()=>{dispatch(ChangeAuthModalStatus({value:true,type:"Login"}))}}>
          Sign in
        </span>
      </div>
    </CardContent>
  </Card>
  )
}

export default Signup