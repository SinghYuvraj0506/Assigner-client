import Navbar from "@/components/Navbar";
import {SidebarDesktop, sidebarOptionType} from "@/components/Sidebar";
import React from "react";
import {
  Home,
  ScrollText,
  Users,
} from "lucide-react"


interface IndexProps {
  children: React.ReactNode;
}

const SidebarDesktopOptions:sidebarOptionType[] = [
  {
    title:"Dashboard",
    navigateTo:"/user/dashboard",
    icon:<Home className="h-4 w-4"/>
  },
  {
    title:"Assignments",
    navigateTo:"/user/assignments",
    icon:<ScrollText className="h-4 w-4"/>
  },
  {
    title:"Profile",
    navigateTo:"/user/profile",
    icon:<Users className="h-4 w-4"/>
  },
]

const Index: React.FC<IndexProps> = ({ children }) => {

  return (
    <>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SidebarDesktop optionsArray={SidebarDesktopOptions}/>

      <div className="flex flex-col">
        <Navbar sidebarMobileOptions={SidebarDesktopOptions}/>

        {children}
      </div>
    </div>
    </>
  );
};

export default Index;
