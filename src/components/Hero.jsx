import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-people-walking-in-an-office-4661/1080p.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-emerald-800/50 to-beige-200/60 mix-blend-multiply" />

      {/* Floating shapes */}
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-400/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center text-white">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Where Young Founders and Investors Meet
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-2xl text-emerald-50/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Collaborate, host talks, and get discovered — designed for ages 15 to 25.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <a href="#join" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold shadow-lg shadow-emerald-900/30 transition">Join the Network</a>
          <a href="#rooms" className="px-6 py-3 rounded-xl bg-beige-200/90 hover:bg-beige-100 text-emerald-900 font-semibold shadow-lg shadow-emerald-900/20 transition">Explore Live Rooms</a>
        </motion.div>
      </div>
    </section>
  )
}
