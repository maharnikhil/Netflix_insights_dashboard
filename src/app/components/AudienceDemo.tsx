import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { genderData, ageData, peakHoursData } from "../data/mockData";
import { Users, Clock, UserCircle } from "lucide-react";
import { motion } from "motion/react";

const COLORS = ["#dc2626", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#06b6d4"];
const AGE_COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

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

const engagementMetrics = [
  { label: "Avg. Watch Time", value: "2.4 hrs/day", pct: 80, color: "#10b981" },
  { label: "Completion Rate", value: "68%", pct: 68, color: "#3b82f6" },
  { label: "Binge-Watching", value: "45%", pct: 45, color: "#8b5cf6" },
  { label: "Retention Rate", value: "92%", pct: 92, color: "#dc2626" },
];

export default function AudienceDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Audience Demographics</h2>
        <p className="text-zinc-400 mt-1">Viewer insights and behavior patterns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Viewers", value: "300M", sub: "+5.1% from last month", icon: Users, color: "#dc2626" },
          { label: "Peak Viewers", value: "75M", sub: "at 21:00 UTC", icon: Clock, color: "#f59e0b" },
          { label: "Avg. Age", value: "28.4", sub: "years old", icon: UserCircle, color: "#3b82f6" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 group"
              style={glassCard}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-zinc-400">{s.label}</p>
                <div className="p-2 rounded-xl" style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-1 text-zinc-500">{s.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Gender & Age */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Gender Distribution</h3>
          <p className="text-xs text-zinc-500 mb-4">Global subscriber breakdown</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={240}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="count" paddingAngle={4}>
                  {genderData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M viewers`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-4">
              {genderData.map((item, i) => (
                <div key={item.gender}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-zinc-300">{item.gender}</span>
                    </div>
                    <span className="text-white font-bold">{item.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[i], boxShadow: `0 0 6px ${COLORS[i]}80` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">{(item.count / 1e6).toFixed(0)}M viewers</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Age Group Distribution</h3>
          <p className="text-xs text-zinc-500 mb-4">Subscribers by age segment</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="ageGroup" stroke="#71717a" tick={{ fontSize: 11 }} />
              <YAxis stroke="#71717a" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 10 }} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M`, "Viewers"]} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {ageData.map((_, i) => <Cell key={i} fill={AGE_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {ageData.map((item, i) => (
              <div key={item.ageGroup} className="text-center py-1.5 px-2 rounded-lg" style={{ background: `${AGE_COLORS[i]}15`, border: `1px solid ${AGE_COLORS[i]}30` }}>
                <p className="text-xs text-zinc-400">{item.ageGroup}</p>
                <p className="text-sm font-bold" style={{ color: AGE_COLORS[i] }}>{item.percentage}%</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Peak Viewing Hours */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={glassCard}>
        <h3 className="text-white font-semibold mb-1">Peak Viewing Hours (UTC)</h3>
        <p className="text-xs text-zinc-500 mb-4">Concurrent viewers throughout the day</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={peakHoursData}>
            <defs>
              <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="hour" stroke="#71717a" tick={{ fontSize: 11 }} />
            <YAxis stroke="#71717a" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(1)}M viewers`, ""]} />
            <Area type="monotone" dataKey="viewers" stroke="#dc2626" fill="url(#peakGrad)" strokeWidth={2.5} dot={{ fill: "#dc2626", r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights & Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5 space-y-3" style={glassCard}>
          <h3 className="text-white font-semibold">Key Insights</h3>
          {[
            { title: "Primary Audience", body: "25-34 year olds make up 30% of total viewers — our largest demographic segment.", icon: "👥" },
            { title: "Gender Balance", body: "Relatively balanced with 52% male and 46% female viewers globally.", icon: "⚖️" },
            { title: "Prime Time", body: "Peak viewing at 21:00 UTC with 75M concurrent viewers worldwide.", icon: "🌙" },
          ].map((ins) => (
            <div key={ins.title} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-xl">{ins.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{ins.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{ins.body}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-4">Engagement Metrics</h3>
          <div className="space-y-5">
            {engagementMetrics.map((m, i) => (
              <div key={m.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-zinc-300">{m.label}</span>
                  <span className="text-sm font-bold text-white">{m.value}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 8px ${m.color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
