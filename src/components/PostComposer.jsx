import { useState } from "react"

export default function PostComposer({ onPosted }) {
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [userId, setUserId] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!content.trim()) return setStatus({ ok: false, msg: "Write something first" })
    if (!userId.trim()) return setStatus({ ok: false, msg: "Provide your user id (profile id)" })

    const payload = {
      user_id: userId.trim(),
      content: content.trim(),
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    }

    try {
      setSubmitting(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setContent("")
      setTags("")
      setStatus({ ok: true, msg: 'Posted! 🎉' })
      onPosted && onPosted()
    } catch (e) {
      setStatus({ ok: false, msg: e.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={3} placeholder="Share a quick update..." className="w-full rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <div className="grid md:grid-cols-3 gap-3">
          <input value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="tags (comma separated)" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <input value={userId} onChange={(e)=>setUserId(e.target.value)} placeholder="your profile id" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <button disabled={submitting} type="submit" className="rounded-xl bg-emerald-600 text-white font-semibold px-4 py-3 hover:bg-emerald-500 disabled:opacity-50">{submitting ? 'Posting...' : 'Post'}</button>
        </div>
        {status && <div className={`text-sm px-3 py-2 rounded ${status.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>}
      </div>
    </form>
  )
}
