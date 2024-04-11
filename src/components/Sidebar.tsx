import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export type sidebarOptionType = {
  title: string;
  navigateTo: string;
  icon?: React.ReactNode;
};

interface SidebarProps {
  optionsArray: sidebarOptionType[];
}

export const SidebarDesktop: React.FC<SidebarProps> = ({ optionsArray }) => {
  const navigate = useNavigate()
  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen overflow-hidden sticky left-0 top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span>Assigner Inc.</span>
          </Link>

          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {optionsArray?.map((option,i) => {
              return (
                <Link
                  to={option?.navigateTo}
                  key={`desktopSidebarOption`+i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {option?.icon}
                  {option?.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Facing Any Issue?</CardTitle>
              <CardDescription>Get in touch with our team.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full" onClick={()=>{navigate("/contact")}}>
                Connect
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const SidebarMobile: React.FC<SidebarProps> = ({ optionsArray }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full">
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <span className="">Assigner Inc.</span>
        </Link>

        {optionsArray?.map((option,i) => {
          return (
            <Link
              to={option?.navigateTo}
              key={`MobileSidebarOption`+i}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              {option?.icon}
              {option?.title}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <Card>
          <CardHeader>
            <CardTitle>Facing Any Issue?</CardTitle>
            <CardDescription>Get in touch with our team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full" onClick={()=>{navigate("/contact")}}>
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
