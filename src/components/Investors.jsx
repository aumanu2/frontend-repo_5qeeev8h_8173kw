import { useEffect, useState } from "react"

export default function Investors() {
  const [profiles, setProfiles] = useState([])
  const [q, setQ] = useState("")
  const [interest, setInterest] = useState("")

  const fetchProfiles = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/profiles`)
      const data = await res.json()
      setProfiles(data.filter(p => p.role === 'investor'))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchProfiles() }, [])

  const filtered = profiles.filter(p => {
    const matchQ = q ? (p.name?.toLowerCase().includes(q.toLowerCase()) || p.bio?.toLowerCase().includes(q.toLowerCase())) : true
    const matchInterest = interest ? (p.interests || []).some(i => i.toLowerCase().includes(interest.toLowerCase())) : true
    return matchQ && matchInterest
  })

  return (
    <section id="investors" className="py-24 bg-emerald-900 text-emerald-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">Investor Discovery</h2>
        <p className="mt-2 text-emerald-100/80">Browse and filter active investors by interests.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search name or bio" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 placeholder-emerald-100/60 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          <input value={interest} onChange={(e)=>setInterest(e.target.value)} placeholder="Filter by interest (e.g., AI, fintech)" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 placeholder-emerald-100/60 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          <button onClick={fetchProfiles} className="rounded-xl bg-emerald-400 text-emerald-900 font-semibold px-4 py-3 hover:bg-emerald-300">Refresh</button>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-3">
                <img src={p.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(p.name||'U')}`} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-xs text-emerald-100/70">{p.location || '—'}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-emerald-50/80">{p.bio || 'No bio provided.'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.interests || []).map(i => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-400/40">{i}</span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-emerald-100/70">No investors match your filters yet.</div>
          )}
        </div>
      </div>
    </section>
  )
}
