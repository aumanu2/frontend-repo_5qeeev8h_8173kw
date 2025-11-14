import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Rooms from './components/Rooms'
import Feed from './components/Feed'

function App() {
  return (
    <div className="min-h-screen bg-emerald-950 text-white">
      <Nav />
      <Hero />
      <Rooms />
      <Feed />

      {/* Join section */}
      <section id="join" className="py-24 bg-gradient-to-b from-beige-100 to-beige-200 text-emerald-950">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Join the movement</h2>
            <p className="mt-3 text-emerald-900/70">Create a profile as a founder or an investor, and start collaborating in minutes.</p>
            <ul className="mt-6 space-y-2 text-emerald-900/80 list-disc list-inside">
              <li>Age-inclusive (15–25) community</li>
              <li>Host and join live rooms</li>
              <li>Build a following with short posts</li>
            </ul>
          </div>
          <form className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-emerald-900/10 shadow-sm">
            <div className="grid gap-4">
              <input placeholder="Your name" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              <input placeholder="Email" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              <select className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option value="founder">Founder</option>
                <option value="investor">Investor</option>
              </select>
              <button type="button" className="mt-2 rounded-xl bg-emerald-500 text-emerald-950 font-semibold py-3 hover:bg-emerald-400">Request Invite</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-emerald-100/70 bg-emerald-950">Built for the next generation.</footer>
    </div>
  )
}

export default App
