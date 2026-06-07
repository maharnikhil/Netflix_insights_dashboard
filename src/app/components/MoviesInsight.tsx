import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";
import { topMovies, contentRatingData } from "../data/mockData";
import { Star, TrendingUp, DollarSign } from "lucide-react";

export default function MoviesInsight() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Movies Insights</h2>
        <p className="text-zinc-400 mt-1">Top performing content and trends</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12,847</div>
            <p className="text-xs text-green-500 mt-1">+342 this month</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              7.8 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-xs text-green-500 mt-1">+0.3 from last quarter</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$940M</div>
            <p className="text-xs text-green-500 mt-1">+15.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Movies Table */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-zinc-400">Rank</TableHead>
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Genre</TableHead>
                <TableHead className="text-zinc-400 text-right">Views</TableHead>
                <TableHead className="text-zinc-400 text-right">Rating</TableHead>
                <TableHead className="text-zinc-400 text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topMovies.map((movie, index) => (
                <TableRow key={movie.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">#{index + 1}</TableCell>
                  <TableCell className="font-semibold text-white">{movie.title}</TableCell>
                  <TableCell className="text-zinc-300">
                    <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-xs">{movie.genre}</span>
                  </TableCell>
                  <TableCell className="text-right text-zinc-300">
                    {(movie.views / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-white">{movie.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-green-500 font-semibold">
                    ${(movie.revenue / 1000000).toFixed(0)}M
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Views */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Revenue by Movie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topMovies}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="title" stroke="#a1a1aa" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Rating Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Content by Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentRatingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="rating" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="#dc2626" name="Count" />
                <Bar dataKey="avgViews" fill="#ea580c" name="Avg Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
