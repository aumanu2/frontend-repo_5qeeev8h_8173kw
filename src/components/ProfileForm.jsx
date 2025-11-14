import { useState } from "react"

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "", age: "", role: "founder", bio: "", interests: "", avatar_url: "", location: "", invite: "" })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)

    const ageNum = parseInt(form.age, 10)
    if (isNaN(ageNum) || ageNum < 15 || ageNum > 25) {
      setStatus({ ok: false, msg: "Age must be between 15 and 25" })
      return
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      age: ageNum,
      role: form.role,
      bio: form.bio.trim(),
      interests: form.interests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      avatar_url: form.avatar_url.trim() || undefined,
      location: form.location.trim() || undefined,
    }

    if (!payload.name || !payload.email) {
      setStatus({ ok: false, msg: "Name and email are required" })
      return
    }

    try {
      setSubmitting(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
      const res = await fetch(`${baseUrl}/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(form.invite ? { "x-invite-code": form.invite } : {}),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || `Request failed ${res.status}`)
      }
      const data = await res.json()
      setStatus({ ok: true, msg: `Profile created! ID ${data.id}` })
      setForm({ name: "", email: "", age: "", role: "founder", bio: "", interests: "", avatar_url: "", location: "", invite: form.invite })
    } catch (err) {
      setStatus({ ok: false, msg: err.message || "Something went wrong" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-emerald-900/10 shadow-sm">
      <div className="grid gap-4">
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <div className="grid grid-cols-2 gap-3">
          <input name="age" value={form.age} onChange={onChange} placeholder="Age (15-25)" type="number" min="15" max="25" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
          <select name="role" value={form.role} onChange={onChange} className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900">
            <option value="founder">Founder</option>
            <option value="investor">Investor</option>
          </select>
        </div>
        <input name="location" value={form.location} onChange={onChange} placeholder="Location" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <input name="avatar_url" value={form.avatar_url} onChange={onChange} placeholder="Avatar URL (optional)" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <textarea name="bio" value={form.bio} onChange={onChange} placeholder="Short bio" rows={3} className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <input name="interests" value={form.interests} onChange={onChange} placeholder="Interests (comma separated)" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900" />
        <input name="invite" value={form.invite} onChange={onChange} placeholder="Invite code (if required)" className="px-4 py-3 rounded-xl border border-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-amber-400 text-emerald-900" />
        <button disabled={submitting} type="submit" className="mt-2 rounded-xl bg-emerald-500 text-emerald-950 font-semibold py-3 hover:bg-emerald-400 disabled:opacity-50">{submitting ? 'Creating...' : 'Create Profile'}</button>
        {status && (
          <div className={`text-sm px-3 py-2 rounded ${status.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>
        )}
      </div>
    </form>
  )
}
