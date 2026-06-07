import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { genderData, ageData, peakHoursData } from "../data/mockData";
import { Users, UserCircle, Clock } from "lucide-react";

const COLORS = ["#dc2626", "#ea580c", "#ca8a04", "#65a30d", "#16a34a", "#0891b2"];

export default function AudienceDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Audience Demographics</h2>
        <p className="text-zinc-400 mt-1">Viewer insights and behavior patterns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Viewers</CardTitle>
            <Users className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">300M</div>
            <p className="text-xs text-green-500 mt-1">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Peak Viewers</CardTitle>
            <Clock className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">75M</div>
            <p className="text-xs text-zinc-400 mt-1">at 21:00 UTC</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Avg. Age</CardTitle>
            <UserCircle className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28.4</div>
            <p className="text-xs text-zinc-400 mt-1">years old</p>
          </CardContent>
        </Card>
      </div>

      {/* Gender & Age Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Gender Distribution</CardTitle>
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
            <div className="mt-4 space-y-2">
              {genderData.map((item, index) => (
                <div key={item.gender} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-zinc-300">{item.gender}</span>
                  </div>
                  <span className="text-sm text-white font-semibold">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Age Group Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="ageGroup" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="#dc2626">
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {ageData.map((item, index) => (
                <div
                  key={item.ageGroup}
                  className="flex items-center justify-between p-2 bg-white/5 backdrop-blur-sm rounded"
                >
                  <span className="text-xs text-zinc-400">{item.ageGroup}</span>
                  <span className="text-xs text-white font-semibold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Viewing Hours */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Peak Viewing Hours (UTC)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis dataKey="hour" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="viewers"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: "#dc2626", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="text-sm font-semibold text-white mb-1">Primary Audience</div>
                <div className="text-xs text-zinc-400">
                  25-34 year olds make up 30% of total viewers, our largest demographic segment
                </div>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="text-sm font-semibold text-white mb-1">Gender Balance</div>
                <div className="text-xs text-zinc-400">
                  Relatively balanced with 52% male and 46% female viewers
                </div>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="text-sm font-semibold text-white mb-1">Prime Time</div>
                <div className="text-xs text-zinc-400">
                  Peak viewing occurs at 21:00 UTC with 75M concurrent viewers
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Avg. Watch Time</span>
                  <span className="text-sm font-semibold text-white">2.4 hrs/day</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Completion Rate</span>
                  <span className="text-sm font-semibold text-white">68%</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Binge-Watching Rate</span>
                  <span className="text-sm font-semibold text-white">45%</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Retention Rate</span>
                  <span className="text-sm font-semibold text-white">92%</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
