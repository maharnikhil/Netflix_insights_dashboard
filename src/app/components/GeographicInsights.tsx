import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { countryData } from "../data/mockData";
import { Globe, TrendingUp, Users, MapPin, Zap } from "lucide-react";
import { motion } from "motion/react";

const REGION_COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#10b981"];

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

const regions = [
  { name: "North America", viewers: 98, pct: 33, color: "#dc2626", flag: "🌎" },
  { name: "Europe", viewers: 91, pct: 30, color: "#f59e0b", flag: "🌍" },
  { name: "Asia-Pacific", viewers: 92, pct: 31, color: "#10b981", flag: "🌏" },
  { name: "Latin America", viewers: 73, pct: 25, color: "#ea580c", flag: "🌎" },
];

export default function GeographicInsights() {
  const topCountries = [...countryData].sort((a, b) => b.viewers - a.viewers).slice(0, 3);
  const fastestGrowing = [...countryData].sort((a, b) => b.growth - a.growth).slice(0, 6);
  const totalViewers = countryData.reduce((s, c) => s + c.viewers, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Geographic Insights</h2>
        <p className="text-zinc-400 mt-1">Regional viewership and growth metrics across 190+ countries</p>
      </div>

      {/* Top 3 Countries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topCountries.map((country, i) => (
          <motion.div
            key={country.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative rounded-2xl p-5 overflow-hidden"
            style={glassCard}
          >
            <div className="absolute top-3 right-3 text-4xl opacity-30">{country.flag}</div>
            <p className="text-xs text-zinc-500 mb-2">#{i + 1} by viewership</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{country.flag}</span>
              <p className="text-xl font-bold text-white">{country.country}</p>
            </div>
            <p className="text-2xl font-bold text-white">{(country.viewers / 1e6).toFixed(0)}M</p>
            <p className="text-xs text-zinc-500 mb-2">viewers</p>
            <div className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">+{country.growth}% growth</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Country Rankings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden" style={glassCard}>
        <div className="p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">All Countries by Viewership</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Rank", "Country", "Viewers", "Growth", "Market Share", "Trend"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countryData.map((c, i) => {
                const share = ((c.viewers / totalViewers) * 100).toFixed(1);
                const isHot = c.growth > 7;
                return (
                  <tr key={c.country} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-zinc-500">#{i + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.flag}</span>
                        <span className="text-sm font-semibold text-white">{c.country}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300">{(c.viewers / 1e6).toFixed(0)}M</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium ${isHot ? "text-emerald-400" : "text-yellow-400"}`}>+{c.growth}%</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden w-16" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div className="h-full rounded-full bg-red-600" style={{ width: `${(c.viewers / countryData[0].viewers) * 100}%` }} />
                        </div>
                        <span className="text-sm text-white font-medium">{share}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {isHot && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-emerald-400" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                          <Zap className="w-2.5 h-2.5" /> Hot
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Viewers by Country</h3>
          <p className="text-xs text-zinc-500 mb-4">Total viewers in millions</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={countryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" stroke="#71717a" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 10 }} />
              <YAxis dataKey="country" type="category" stroke="#71717a" width={110} tick={{ fontSize: 10 }} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M`, "Viewers"]} />
              <Bar dataKey="viewers" radius={[0, 6, 6, 0]}>
                {countryData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${0 + i * 15}, 75%, ${50 - i * 2}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Fastest Growing Markets</h3>
          <p className="text-xs text-zinc-500 mb-4">YoY subscriber growth %</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={fastestGrowing}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="country" stroke="#71717a" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
              <YAxis stroke="#71717a" tickFormatter={(v) => `${v}%`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, "Growth"]} />
              <Bar dataKey="growth" radius={[6, 6, 0, 0]}>
                {fastestGrowing.map((c, i) => (
                  <Cell key={i} fill={c.growth > 8 ? "#10b981" : c.growth > 6 ? "#f59e0b" : "#dc2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Regional Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-4">Regional Breakdown</h3>
          <div className="space-y-4">
            {regions.map((r, i) => (
              <div key={r.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{r.flag}</span>
                    <span className="text-sm text-zinc-300">{r.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{r.viewers}M viewers</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="rounded-2xl p-5 space-y-3" style={glassCard}>
          <h3 className="text-white font-semibold">Market Insights</h3>
          {[
            { icon: MapPin, color: "#10b981", title: "Emerging Markets", body: "India leads with 12.3% growth, followed by South Korea at 9.1% — Asian markets are the fastest expanding globally." },
            { icon: Users, color: "#3b82f6", title: "Largest Markets", body: "US, India, and Brazil together account for 53% of total global viewership." },
            { icon: TrendingUp, color: "#8b5cf6", title: "Growth Opportunity", body: "Asia-Pacific shows strongest long-term growth potential with a combined 92M viewers and accelerating adoption." },
          ].map((ins) => {
            const Icon = ins.icon;
            return (
              <div key={ins.title} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="mt-0.5 p-1.5 rounded-lg flex-shrink-0" style={{ background: `${ins.color}20` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: ins.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{ins.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{ins.body}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
