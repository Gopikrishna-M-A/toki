import AuthProvider from "@/components/AuthProvider"
import "./globals.css"

export const metadata = {
  title: 'Toki',
  description: 'Discover partners and manage perks',
}

export default async function RootLayout({ children }) {
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



