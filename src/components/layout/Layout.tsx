import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-h-screen pt-16 md:pl-56">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
