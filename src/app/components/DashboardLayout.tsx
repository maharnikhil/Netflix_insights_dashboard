import { Outlet, Link, useLocation } from "react-router";
import { Card } from "./ui/card";
import { BarChart3, Film, Users, Globe, TrendingUp } from "lucide-react";

const navItems = [
  { path: "/", label: "Overview", icon: BarChart3 },
  { path: "/movies", label: "Movies", icon: Film },
  { path: "/genres", label: "Genres", icon: TrendingUp },
  { path: "/audience", label: "Audience", icon: Users },
  { path: "/geographic", label: "Geographic", icon: Globe },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950/20 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-red-600 font-bold text-3xl drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">N</div>
              <h1 className="text-xl font-semibold">Netflix Insights</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">Last updated: Jun 7, 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                    isActive
                      ? "border-red-600 text-white bg-white/5"
                      : "border-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
