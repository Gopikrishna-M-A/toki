import Navbar from "./_components/Navbar"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <div className='flex h-screen bg-white md:bg-gray-100'>
      <Navbar>
        <div className='md:p-5 w-full h-full overflow-y-scroll'>
          {children}
        </div>
      </Navbar>
    </div>
  )
}
