import { Menu } from "lucide-react"

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-20">
      <div className="backdrop-blur-md bg-emerald-900/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-beige-100 font-extrabold tracking-tight text-xl">
            GreenLink
          </a>
          <nav className="hidden md:flex gap-6 items-center text-emerald-50/90">
            <a href="#rooms" className="hover:text-white">Rooms</a>
            <a href="#feed" className="hover:text-white">Feed</a>
            <a href="#investors" className="hover:text-white">Investors</a>
            <a href="/test" className="hover:text-white">Status</a>
            <a href="#join" className="ml-4 px-4 py-2 rounded-lg bg-emerald-400 text-emerald-900 font-semibold hover:bg-emerald-300">Join</a>
          </nav>
          <button className="md:hidden text-white p-2">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  )
}
