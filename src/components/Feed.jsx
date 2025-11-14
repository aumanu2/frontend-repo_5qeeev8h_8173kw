import { useEffect, useState } from "react"

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/posts`)
        const data = await res.json()
        setPosts(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="feed" className="py-24 bg-beige-100 text-emerald-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">Community Feed</h2>
        <p className="mt-2 text-emerald-900/70">Quick takes from founders and investors.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.id} className="rounded-2xl bg-white shadow-sm border border-emerald-900/10 p-6">
              <div className="text-sm text-emerald-900/60">{(p.tags || []).map(t => `#${t}`).join(' ')}</div>
              <p className="mt-2 text-lg">{p.content}</p>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="text-emerald-900/60">No posts yet. Share something inspiring!</div>
          )}
        </div>
      </div>
    </section>
  )
}
