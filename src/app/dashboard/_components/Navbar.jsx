"use client"
import React from "react"
import Link from "next/link"
import { Compass, BarChart2, Gift, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const NavItem = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
      "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}>
    <Icon className='h-4 w-4' />
    <span>{children}</span>
  </Link>
)

const Navbar = ({ children }) => {
  const { user } = useAuth()
  const handleSignout = () => {
    signOut({ callbackUrl: "/" })
  }
  return (
    <div className='flex h-screen bg-gray-100 w-full'>
      <nav className='w-64 bg-white border-r flex flex-col'>
        <div className='p-6'>
          <Link href='/dashboard' className='text-2xl font-bold'>
            TOKI
          </Link>
        </div>
        <div className='mt-6 flex flex-col flex-grow'>
          <p className='px-3 text-sm font-medium text-gray-500 mb-2'>Menu</p>
          <NavItem href='/dashboard/discover' icon={Compass}>
            Discover
          </NavItem>
          <NavItem href='/dashboard/manage-perks' icon={Gift}>
            Manage perks
          </NavItem>
          <NavItem href='/dashboard/analytics' icon={BarChart2}>
            Analytics
          </NavItem>
        </div>
        <div className='py-4 px-2 mt-auto border-t'>
          <div className='flex flex-col gap-2'>
            <div className="flex items-center w-ful gap-2">
            <Avatar>
              <AvatarImage src={user?.image} alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-xs font-medium'>{user?.name}</p>
              <p className='text-xs text-gray-500'>{user?.email}</p>
            </div>
            </div>
          

            <Button onClick={handleSignout} className='w-full text-gray-500' variant='outline'>
              <LogOut className='h-4 w-4  mr-2' /> Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className='flex-1 overflow-y-auto p-6 w-full'>{children}</main>
    </div>
  )
}

export default Navbar
