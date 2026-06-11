import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  accentColor?: string;
  index?: number;
}

export default function StatCard({ title, value, change, icon: Icon, trend, accentColor = "#dc2626", index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}15, transparent 70%)` }}
      />
      {/* Top border glow */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <div
            className="p-2 rounded-xl"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
          >
            <Icon className="w-4 h-4" style={{ color: accentColor }} />
          </div>
        </div>

        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>

        {change && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
