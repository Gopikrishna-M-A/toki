import Navbar from "./_components/Navbar"

export default async function DashboardLayout({ children }) {
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
