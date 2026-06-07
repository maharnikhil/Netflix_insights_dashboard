import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export default function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <Icon className="w-4 h-4 text-zinc-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <p className={`text-xs mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
