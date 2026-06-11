import { Outlet, Link, useLocation } from "react-router";
import { BarChart3, Film, Users, Globe, TrendingUp, Activity, Bell, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "Overview", icon: BarChart3 },
  { path: "/movies", label: "Movies", icon: Film },
  { path: "/genres", label: "Genres", icon: TrendingUp },
  { path: "/audience", label: "Audience", icon: Users },
  { path: "/geographic", label: "Geographic", icon: Globe },
];

const liveStats = [
  "🔴 Live: 8.2M viewers right now",
  "🎬 Squid Game S2 — #1 Trending Globally",
  "📈 +1.2M new subscribers this week",
  "⭐ Wednesday rated 8.1 on IMDB",
  "🌍 190+ countries streaming now",
];

export default function DashboardLayout() {
  const location = useLocation();
  const [tickerIdx, setTickerIdx] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTickerIdx((i) => (i + 1) % liveStats.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at 20% 0%, #3d0000 0%, #0a0a0a 50%, #000 100%)" }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #9333ea, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)", filter: "blur(70px)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(24px)" }}>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-red-600 font-black text-4xl leading-none" style={{ textShadow: "0 0 30px rgba(220,38,38,0.8), 0 0 60px rgba(220,38,38,0.4)" }}>
                  N
                </span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Netflix Insights</h1>
                <p className="text-xs text-zinc-500 leading-none">Analytics Dashboard</p>
              </div>
            </div>

            {/* Live ticker */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 overflow-hidden max-w-xs" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
              <Activity className="w-3 h-3 text-red-500 animate-pulse flex-shrink-0" />
              <div className="overflow-hidden h-4 w-56">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tickerIdx}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs text-zinc-300 whitespace-nowrap"
                  >
                    {liveStats[tickerIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all" style={{ backdropFilter: "blur(12px)" }}>
                <Search className="w-4 h-4" />
              </button>
              <button className="relative p-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all" style={{ backdropFilter: "blur(12px)" }}>
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-zinc-500">Live</p>
                <p className="text-xs font-medium text-white">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[65px] z-40 border-b border-white/10" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)" }}>
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-none"
                      style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                      style={{ boxShadow: "0 0 8px rgba(239,68,68,0.8)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
