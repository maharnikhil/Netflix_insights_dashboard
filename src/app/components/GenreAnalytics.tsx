import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from "recharts";
import { genreData } from "../data/mockData";
import { Trophy, Eye, Clock, Star } from "lucide-react";
import { motion } from "motion/react";

const COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316"];

const glassCard = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
};

const tooltipStyle = {
  contentStyle: { background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", borderRadius: 12 },
  labelStyle: { color: "#fff" },
};

export default function GenreAnalytics() {
  const topGenres = [...genreData].sort((a, b) => b.views - a.views).slice(0, 3);
  const medalColors = ["#f59e0b", "#9ca3af", "#b45309"];
  const medalLabels = ["Gold", "Silver", "Bronze"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Genre Analytics</h2>
        <p className="text-zinc-400 mt-1">Content performance by genre</p>
      </div>

      {/* Top 3 Genre Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topGenres.map((genre, i) => (
          <motion.div
            key={genre.genre}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative rounded-2xl p-5 overflow-hidden"
            style={{ ...glassCard, borderColor: `${medalColors[i]}40` }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 -translate-y-8 translate-x-8"
              style={{ background: `radial-gradient(circle, ${medalColors[i]}, transparent 70%)`, filter: "blur(20px)" }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `${medalColors[i]}20`, color: medalColors[i] }}>
                #{i + 1} {medalLabels[i]}
              </span>
              <Trophy className="w-5 h-5" style={{ color: medalColors[i] }} />
            </div>
            <p className="text-2xl font-bold text-white">{genre.genre}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1 text-zinc-400">
                <Eye className="w-3.5 h-3.5" />
                <span>{(genre.views / 1e6).toFixed(0)}M</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>{genre.avgRating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Genre Comparison — horizontal bars */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-5" style={glassCard}>
        <h3 className="text-white font-semibold mb-1">Genre Performance Comparison</h3>
        <p className="text-xs text-zinc-500 mb-4">Views and watch hours across all genres</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={genreData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
            <XAxis type="number" stroke="#71717a" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 10 }} />
            <YAxis dataKey="genre" type="category" stroke="#71717a" width={90} tick={{ fontSize: 11 }} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M`, ""]} />
            <Bar dataKey="views" name="Views" radius={[0, 4, 4, 0]}>
              {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Radar + Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Genre Rating Radar</h3>
          <p className="text-xs text-zinc-500 mb-4">Average IMDB ratings by genre</p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={genreData}>
              <PolarGrid stroke="#ffffff15" />
              <PolarAngleAxis dataKey="genre" stroke="#71717a" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis stroke="#71717a" tick={{ fontSize: 9 }} domain={[6, 9]} />
              <Radar name="Rating" dataKey="avgRating" stroke="#dc2626" fill="#dc2626" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip {...tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-4">Detailed Genre Metrics</h3>
          <div className="space-y-2 overflow-y-auto max-h-[320px] pr-1">
            {genreData.map((genre, i) => (
              <motion.div
                key={genre.genre}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-8 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div>
                    <p className="text-sm font-semibold text-white">{genre.genre}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-zinc-500">
                      <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{(genre.views / 1e6).toFixed(0)}M</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{(genre.hours / 1e9).toFixed(1)}B hrs</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span className="text-sm font-bold">{genre.avgRating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
