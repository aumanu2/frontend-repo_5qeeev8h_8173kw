import Nav from './components/Nav'
import Hero from './components/Hero'
import Rooms from './components/Rooms'
import Feed from './components/Feed'
import Investors from './components/Investors'
import ProfileForm from './components/ProfileForm'
import PostComposer from './components/PostComposer'
import RoomCreator from './components/RoomCreator'

function App() {
  const refresh = () => {
    // Triggered after create actions; simple page reload to refresh lists
    window.location.hash = ''
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-emerald-950 text-white">
      <Nav />
      <Hero />

      {/* Creation widgets */}
      <section className="py-16 bg-emerald-900/40">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Rooms />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <h3 className="text-xl font-bold mb-3">Create a Room</h3>
              <RoomCreator onCreated={refresh} />
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <h3 className="text-xl font-bold mb-3">Post an Update</h3>
              <PostComposer onPosted={refresh} />
            </div>
          </div>
        </div>
      </section>

      <Feed />
      <Investors />

      {/* Join / Profile creation */}
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
          <ProfileForm />
        </div>
      </section>

      <footer className="py-10 text-center text-emerald-100/70 bg-emerald-950">Built for the next generation.</footer>
    </div>
  )
}

export default App
