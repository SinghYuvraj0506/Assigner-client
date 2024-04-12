import { CircleUser, Menu, Search } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarMobile, sidebarOptionType } from './Sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from '@/lib/hooks/useAuth'
import { useLogoutUserMutation } from '@/app/features/auth/authApi'

interface NavbarProps{
  sidebarMobileOptions:sidebarOptionType[]
}

const Navbar:React.FC<NavbarProps> = ({sidebarMobileOptions}) => {
  const {user} = useAuth()

  const [logoutUser] = useLogoutUserMutation()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SidebarMobile optionsArray={sidebarMobileOptions}/>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assignments..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
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
              <DropdownMenuItem>Join Us!!</DropdownMenuItem>
              <DropdownMenuItem>About Us</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>{logoutUser()}}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
  )
}

export default Navbar