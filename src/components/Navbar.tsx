import { CircleUser, Menu, Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarMobile, sidebarOptionType } from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/lib/hooks/useAuth";
import { useLogoutUserMutation } from "@/app/features/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import mixpanel from 'mixpanel-browser';

interface NavbarProps {
  sidebarMobileOptions: sidebarOptionType[];
}

export const NavbarUserDashboard: React.FC<NavbarProps> = ({
  sidebarMobileOptions,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [logoutUser] = useLogoutUserMutation();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarMobile optionsArray={sidebarMobileOptions} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{navigate("/pricing");mixpanel.track("Pricing tab on Navbar User Dashboard")}}>Pricing</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{window.open("https://forms.gle/2FYMWrPM2Tj6EUkJ6");;mixpanel.track("Start Writing tab on Navbar User Dashboard")}}>Start Writing with Us</DropdownMenuItem>
          {/* <DropdownMenuItem>Feedback</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await logoutUser(null);
              mixpanel.track("Logout on Navbar User Dashboard")
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export const NavbarMain = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <div className="w-full px-4 sm:px-10 flex items-center justify-between py-4 font-inter box-border">
      <div>
        <span className="text-xl font-bold text-primary-green cursor-pointer flex items-center gap-2" onClick={()=>{navigate("/");mixpanel.track("Assigner Navbar Logo Clicked")}}>
          <img src="/logo.png" alt="" className="w-5"/>Assigner
        </span>
      </div>

      <div className="flex items-center gap-10">
       {window.screen.width > 600 && <>
       {location.pathname !== "/pricing" && <span className="cursor-pointer text-[16px]" onClick={()=>{navigate("/pricing");mixpanel.track("Pricing tab on Navbar")}}>Pricing</span>}
       {location.pathname !== "/contact" && <span className="cursor-pointer text-[16px]" onClick={()=>{navigate("/contact");mixpanel.track("Contact tab on Navbar")}}>Contact</span>}
        <span className="cursor-pointer text-[16px" onClick={()=>{window.open("https://forms.gle/2FYMWrPM2Tj6EUkJ6");mixpanel.track("Start Writing tab on Navbar")}}>Start Writing with Us</span>
        </>}
        <Button
          onClick={() => {
            mixpanel.track(isAuthenticated ? "Clicked Dashboard on Navbar" : "Clicked Login on Navbar");
            isAuthenticated
              ? navigate("/user")
              : dispatch(ChangeModalStatus({ value: true, type: "Login" }));
          }}
        >
          {isAuthenticated ? "Dashboard" : "Login"}
        </Button>
      </div>
    </div>
  );
};
