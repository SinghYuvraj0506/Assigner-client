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

interface NavbarProps {
  sidebarMobileOptions: sidebarOptionType[];
}

export const NavbarUserDashboard: React.FC<NavbarProps> = ({
  sidebarMobileOptions,
}) => {
  const { user } = useAuth();

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
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
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
          <DropdownMenuItem>Pricing</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{window.open("https://forms.gle/2FYMWrPM2Tj6EUkJ6")}}>Join Us!!</DropdownMenuItem>
          <DropdownMenuItem>Feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await logoutUser(null);
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
        <span className="text-xl font-bold text-primary-green cursor-pointer" onClick={()=>{navigate("/")}}>
          Assigner
        </span>
      </div>

      <div className="flex items-center gap-10">
       {window.screen.width > 600 && <>
       {location.pathname !== "/pricing" && <span className="cursor-pointer text-[16px]" onClick={()=>{navigate("/pricing")}}>Pricing</span>}
       {location.pathname !== "/contact" && <span className="cursor-pointer text-[16px]" onClick={()=>{navigate("/contact")}}>Contact</span>}
        <span className="cursor-pointer text-[16px" onClick={()=>{window.open("https://forms.gle/2FYMWrPM2Tj6EUkJ6")}}>Join Us</span>
        </>}
        <Button
          onClick={() => {
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
