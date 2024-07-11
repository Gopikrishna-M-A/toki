"use client"
import React from "react"
import Link from "next/link"
import { Compass, BarChart2, Gift, LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const NavItem = ({ href, icon: Icon, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
        "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}>
      <Icon className={cn("h-4 w-4", isActive && "text-blue-500")} />
      <span>{children}</span>
    </Link>
  )
}

const Navbar = ({ children }) => {
  const { user } = useAuth()
  const [open, setOpen] = React.useState(false)
  const handleSignout = () => {
    signOut({ callbackUrl: "/" })
  }
  return (
    <div className='flex h-screen bg-gray-100 w-full'>
      <nav className='w-64 bg-white border-r  flex-col hidden md:flex'>
        <div className='p-6'>
          <Link href='/dashboard' className='text-2xl font-bold'>
            TOKI
          </Link>
        </div>
        <div className='mt-6 flex gap-1 flex-col flex-grow px-5'>
          <p className='px-3 text-sm font-medium text-gray-500 mb-2'>Menu</p>
          <NavItem href='/dashboard/discover' icon={Compass}>
            Discover
          </NavItem>
          <NavItem href='/dashboard/manage-perks' icon={Gift}>
            Manage perks
          </NavItem>
          <NavItem href='/dashboard' icon={BarChart2}>
            Profile
          </NavItem>
        </div>
        <div className='py-4 px-2 mt-auto border-t'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center w-ful gap-2'>
              <Avatar>
                <AvatarImage src={user?.image} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-xs font-medium'>{user?.name}</p>
                <p className='text-xs text-gray-500'>{user?.email}</p>
              </div>
            </div>

            <Button
              onClick={handleSignout}
              className='w-full text-gray-500'
              variant='outline'>
              <LogOut className='h-4 w-4  mr-2' /> Logout
            </Button>
          </div>
        </div>
      </nav>
      <nav className='fixed  top-0 left-0 right-0 px-4 py-3 flex md:hidden justify-between bg-white'>
        <Link href='/dashboard' className='text-2xl font-bold'>
          TOKI
        </Link>
        <Menu onClick={() => setOpen((prev) => !prev)} />
      </nav>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-gray-500'>Menu</DrawerTitle>
          </DrawerHeader>
          <div className='mt-6 flex gap-1 flex-col px-5 flex-grow'>
            <NavItem href='/dashboard/discover' icon={Compass}>
              Discover
            </NavItem>
            <NavItem href='/dashboard/manage-perks' icon={Gift}>
              Manage perks
            </NavItem>
            <NavItem href='/dashboard' icon={BarChart2}>
              Profile
            </NavItem>
          </div>
          <div className='flex flex-col gap-2  px-5 py-10'>
            <div className='flex items-center w-ful gap-2'>
              <Avatar>
                <AvatarImage src={user?.image} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-xs font-medium'>{user?.name}</p>
                <p className='text-xs text-gray-500'>{user?.email}</p>
              </div>
            </div>

            <Button
              onClick={handleSignout}
              className='w-full text-gray-500'
              variant='outline'>
              <LogOut className='h-4 w-4  mr-2' /> Logout
            </Button>
          </div>
        </DrawerContent>
        
      </Drawer>
      <main className='flex-1 mt-14  md:mt-0 overflow-y-auto md:p-6 w-full'>
        {children}
      </main>
    </div>
  )
}

export default Navbar
