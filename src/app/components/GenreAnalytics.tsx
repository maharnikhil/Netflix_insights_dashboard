import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from "recharts";
import { genreData } from "../data/mockData";
import { Trophy, Eye, Clock } from "lucide-react";

export default function GenreAnalytics() {
  const topGenres = [...genreData].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Genre Analytics</h2>
        <p className="text-zinc-400 mt-1">Content performance by genre</p>
      </div>

      {/* Top Genres Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topGenres.map((genre, index) => (
          <Card key={genre.genre} className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                #{index + 1} Genre
              </CardTitle>
              <Trophy className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-zinc-400' : 'text-orange-600'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{genre.genre}</div>
              <p className="text-xs text-zinc-400 mt-1">
                {(genre.views / 1000000).toFixed(0)}M views
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-green-500">★ {genre.avgRating}</span>
                <span className="text-xs text-zinc-500">avg rating</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Genre Comparison Chart */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Genre Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={genreData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis type="number" stroke="#a1a1aa" />
              <YAxis dataKey="genre" type="category" stroke="#a1a1aa" width={100} />
              <Tooltip
                contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="views" fill="#dc2626" name="Views" />
              <Bar dataKey="hours" fill="#ea580c" name="Watch Hours" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Genre Rating Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Genre Rating Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={genreData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="genre" stroke="#a1a1aa" />
                <PolarRadiusAxis stroke="#a1a1aa" />
                <Radar
                  name="Avg Rating"
                  dataKey="avgRating"
                  stroke="#dc2626"
                  fill="#dc2626"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Genre Stats Table */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Detailed Genre Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {genreData.map((genre) => (
                <div
                  key={genre.genre}
                  className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-white">{genre.genre}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {(genre.views / 1000000).toFixed(0)}M
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {(genre.hours / 1000000).toFixed(0)}M hrs
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 font-semibold">★ {genre.avgRating}</div>
                    <div className="text-xs text-zinc-500">rating</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
