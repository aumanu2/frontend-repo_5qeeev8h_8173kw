import { useState } from "react"

export default function RoomCreator({ onCreated }) {
  const [form, setForm] = useState({ title: "", topic: "", description: "", host_id: "", cover_url: "", is_live: true })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!form.title.trim() || !form.topic.trim() || !form.host_id.trim()) {
      setStatus({ ok: false, msg: "Title, topic and host id are required" })
      return
    }

    try {
      setSubmitting(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          topic: form.topic.trim(),
          description: form.description.trim(),
          host_id: form.host_id.trim(),
          is_live: !!form.is_live,
          cover_url: form.cover_url.trim() || undefined
        })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setStatus({ ok: true, msg: 'Room created ✅' })
      setForm({ title: "", topic: "", description: "", host_id: "", cover_url: "", is_live: true })
      onCreated && onCreated()
    } catch (e) {
      setStatus({ ok: false, msg: e.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <div className="grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="title" value={form.title} onChange={onChange} placeholder="Room title" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <input name="topic" value={form.topic} onChange={onChange} placeholder="Topic" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        </div>
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" rows={3} className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <div className="grid md:grid-cols-3 gap-3">
          <input name="host_id" value={form.host_id} onChange={onChange} placeholder="host profile id" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <input name="cover_url" value={form.cover_url} onChange={onChange} placeholder="cover image url (optional)" className="rounded-xl border border-emerald-900/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <label className="flex items-center gap-2 text-emerald-900"><input type="checkbox" name="is_live" checked={form.is_live} onChange={onChange} /> Live now</label>
        </div>
        <button disabled={submitting} type="submit" className="rounded-xl bg-emerald-600 text-white font-semibold px-4 py-3 hover:bg-emerald-500 disabled:opacity-50">{submitting ? 'Creating...' : 'Create Room'}</button>
        {status && <div className={`text-sm px-3 py-2 rounded ${status.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>}
      </div>
    </form>
  )
}
