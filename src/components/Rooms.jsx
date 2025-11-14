import { useEffect, useState } from "react"

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/rooms`)
        const data = await res.json()
        setRooms(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  return (
    <section id="rooms" className="relative py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-emerald-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">Live Rooms</h2>
        <p className="mt-2 text-emerald-100/80">Join conversations with founders and investors right now.</p>

        {loading ? (
          <p className="mt-8 opacity-80">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="mt-8 opacity-80">No rooms yet. Be the first to host a talk!</p>
        ) : (
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-300/40 transition">
                {room.cover_url ? (
                  <img src={room.cover_url} alt={room.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-tr from-emerald-600/60 to-amber-200/30" />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{room.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${room.is_live ? 'bg-emerald-400 text-emerald-950' : 'bg-emerald-700/40'}`}>{room.is_live ? 'LIVE' : 'OFF'}</span>
                  </div>
                  <p className="mt-2 text-emerald-100/80 text-sm">{room.topic}</p>
                  <button className="mt-4 w-full rounded-xl bg-emerald-400 text-emerald-950 font-semibold py-2 hover:bg-emerald-300 transition">Enter Room</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
