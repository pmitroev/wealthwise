import logo from '../../assets/logo.png'

interface NavbarProps {
  onMenuClick: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100 md:hidden"
        >
          ☰
        </button>
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <span className="mt-1 pl-3 text-xl font-bold text-[#50b0eb]">
            Wealth
          </span>
          <span className="mt-1 text-xl font-bold text-[#ffbd58]">Wise</span>
        </div>
      </div>
      <span className="hidden sm:block text-sm text-gray-500">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </header>
  )
}

export default Navbar
