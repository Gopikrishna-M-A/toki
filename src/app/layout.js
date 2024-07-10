import AuthProvider from "@/components/AuthProvider"
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'
import { redirect } from "next/navigation"
import "./globals.css"

export const metadata = {
  title: 'Toki',
  description: 'Discover partners and manage perks',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)


  return (
    <html lang='en'>
      <body suppressHydrationWarning >
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}



