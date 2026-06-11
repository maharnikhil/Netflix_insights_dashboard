import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { Eye, Clock, Users, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import StatCard from "./StatCard";
import { monthlyViewsData, genreData, genderData, deviceData } from "../data/mockData";

const COLORS = ["#dc2626", "#ea580c", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

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

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Overview</h2>
          <p className="text-zinc-400 mt-1">Global Netflix performance metrics</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}>
          <Zap className="w-3 h-3 text-red-400" />
          <span className="text-red-400">8.2M watching now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Views" value="1.65B" change="+12.5% from last month" icon={Eye} trend="up" accentColor="#dc2626" index={0} />
        <StatCard title="Watch Hours" value="12.4B" change="+8.3% from last month" icon={Clock} trend="up" accentColor="#f59e0b" index={1} />
        <StatCard title="Subscribers" value="300M" change="+5.1% from last month" icon={Users} trend="up" accentColor="#3b82f6" index={2} />
        <StatCard title="Avg. IMDB Rating" value="7.8/10" change="+0.2 from last month" icon={TrendingUp} trend="up" accentColor="#10b981" index={3} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Monthly Views & Hours</h3>
          <p className="text-xs text-zinc-500 mb-4">Rolling 6-month trend</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyViewsData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} />
              <YAxis stroke="#71717a" tickFormatter={(v) => `${(v / 1e9).toFixed(1)}B`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M`, ""]} />
              <Area type="monotone" dataKey="views" stroke="#dc2626" fill="url(#viewsGrad)" strokeWidth={2} name="Views" />
              <Area type="monotone" dataKey="hours" stroke="#f59e0b" fill="url(#hoursGrad)" strokeWidth={2} name="Hours" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Top Genres by Views</h3>
          <p className="text-xs text-zinc-500 mb-4">All-time viewership distribution</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={genreData.slice(0, 6)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" stroke="#71717a" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="genre" stroke="#71717a" width={70} tick={{ fontSize: 11 }} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M views`, ""]} />
              <Bar dataKey="views" radius={[0, 6, 6, 0]}>
                {genreData.slice(0, 6).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Audience by Gender</h3>
          <p className="text-xs text-zinc-500 mb-4">Global subscriber demographics</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="60%" height={260}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="count" paddingAngle={3}>
                  {genderData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1e6).toFixed(0)}M`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {genderData.map((d, i) => (
                <div key={d.gender} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-300">{d.gender}</span>
                      <span className="text-white font-medium">{d.percentage}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${d.percentage}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: COLORS[i] }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={glassCard}>
          <h3 className="text-white font-semibold mb-1">Viewing Devices</h3>
          <p className="text-xs text-zinc-500 mb-4">Platform distribution across subscribers</p>
          <div className="space-y-5">
            {deviceData.map((device, i) => (
              <div key={device.device}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-zinc-300">{device.device}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{device.users.toLocaleString()} users</span>
                    <span className="text-sm font-bold text-white">{device.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.percentage}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: COLORS[i], boxShadow: `0 0 8px ${COLORS[i]}60` }}
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
