import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Eye, Clock, Users, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { monthlyViewsData, genreData, genderData, deviceData } from "../data/mockData";

const COLORS = ["#dc2626", "#ea580c", "#ca8a04", "#65a30d", "#16a34a", "#0891b2"];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="text-zinc-400 mt-1">Global Netflix performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value="1.65B"
          change="+12.5% from last month"
          icon={Eye}
          trend="up"
        />
        <StatCard
          title="Watch Hours"
          value="12.4B"
          change="+8.3% from last month"
          icon={Clock}
          trend="up"
        />
        <StatCard
          title="Active Subscribers"
          value="300M"
          change="+5.1% from last month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Avg. Rating"
          value="7.8/10"
          change="+0.2 from last month"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Views Trend */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Monthly Views & Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="month" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#ea580c"
                  strokeWidth={2}
                  name="Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Genre Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Top Genres by Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreData.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="genre" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="views" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Audience by Gender</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Viewing Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={device.device}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-300">{device.device}</span>
                    <span className="text-sm font-semibold text-white">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${device.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 mt-1 block">
                    {device.users.toLocaleString()} users
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
