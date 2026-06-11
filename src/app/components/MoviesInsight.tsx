import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Star, TrendingUp, Film, Wifi, WifiOff, RefreshCw, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMovieData } from "../hooks/useMovieData";
import { contentRatingData } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const glassCard = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
};

export default function MoviesInsight() {
  const { movies, loading, isLive, lastUpdated } = useMovieData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">Movies Insights</h2>
          <p className="text-zinc-400 mt-1">Top performing content and trends</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={glassCard}>
          {loading ? (
            <><RefreshCw className="w-3 h-3 text-zinc-400 animate-spin" /><span className="text-zinc-400">Fetching IMDB data…</span></>
          ) : isLive ? (
            <><Wifi className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Live IMDB Data</span></>
          ) : (
            <><WifiOff className="w-3 h-3 text-zinc-500" /><span className="text-zinc-500">Demo Data — Add OMDB key for live</span></>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Titles", value: "12,847", sub: "+342 this month", color: "#dc2626" },
          { label: "Avg. IMDB Rating", value: isLive ? `${(movies.reduce((a, m) => a + m.rating, 0) / movies.length).toFixed(1)}` : "7.8", sub: "+0.3 from last quarter", color: "#f59e0b" },
          { label: "Total Revenue", value: "$940M", sub: "+15.2% from last month", color: "#10b981" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-5"
            style={glassCard}
          >
            <p className="text-sm text-zinc-400">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
            <p className="text-xs mt-1" style={{ color: s.color }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Movie Poster Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Film className="w-5 h-5 text-red-500" />
          Top Performing Shows
          {isLive && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">IMDB</span>}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          <AnimatePresence>
            {movies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "2/3", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {movie.poster ? (
                  <ImageWithFallback
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, #1a1a1a, #dc262620)` }}>
                    <Film className="w-8 h-8 text-zinc-600" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}>
                  <p className="text-xs font-semibold text-white leading-tight">{movie.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-yellow-400">{movie.imdbRating}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Eye className="w-2.5 h-2.5 text-zinc-400" />
                    <span className="text-[10px] text-zinc-400">{(movie.views / 1e6).toFixed(0)}M views</span>
                  </div>
                </div>

                {/* Rank badge */}
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "rgba(220,38,38,0.9)", backdropFilter: "blur(4px)" }}>
                  {i + 1}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-4">Revenue by Show ($M)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={movies}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="title" stroke="#71717a" angle={-35} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
              <YAxis stroke="#71717a" tickFormatter={(v) => `$${(v / 1e6).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", borderRadius: 12 }}
                labelStyle={{ color: "#fff" }}
                formatter={(v: number) => [`$${(v / 1e6).toFixed(0)}M`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {movies.map((_, i) => (
                  <rect key={i} fill={`hsl(${0 + i * 8}, 80%, ${45 + i * 2}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-4">Content by Rating Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={contentRatingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="rating" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", borderRadius: 12 }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="count" fill="#dc2626" radius={[6, 6, 0, 0]} name="Titles" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl overflow-hidden" style={glassCard}>
        <div className="p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Detailed Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                {["Rank", "Title", "Genre", "Year", "IMDB Rating", "Views", "Revenue"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, i) => (
                <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-zinc-500">#{i + 1}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {movie.poster ? (
                        <ImageWithFallback src={movie.poster} alt={movie.title} className="w-8 h-10 object-cover rounded-md flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-10 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Film className="w-4 h-4 text-zinc-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{movie.title}</p>
                        {movie.isLive && <p className="text-xs text-zinc-500 truncate max-w-[140px]">{movie.actors?.split(",")[0]}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-md text-xs text-zinc-300" style={{ background: "rgba(255,255,255,0.08)" }}>{movie.genre}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-400">{movie.year}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-white font-medium">{movie.imdbRating}</span>
                      {movie.isLive && <span className="text-[10px] text-zinc-500 ml-1">IMDB</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{(movie.views / 1e6).toFixed(1)}M</td>
                  <td className="px-5 py-4 text-sm font-semibold text-emerald-400">${(movie.revenue / 1e6).toFixed(0)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/10">
          <p className="text-xs text-zinc-600">
            {isLive ? `Live IMDB data · Last updated ${lastUpdated.toLocaleTimeString()}` : "Demo data · Add your OMDB API key in src/app/services/omdbService.ts for live IMDB ratings"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
