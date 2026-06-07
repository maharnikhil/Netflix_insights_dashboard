import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { countryData } from "../data/mockData";
import { Globe, TrendingUp, Users, MapPin } from "lucide-react";

export default function GeographicInsights() {
  const topCountries = [...countryData].sort((a, b) => b.viewers - a.viewers).slice(0, 3);
  const fastestGrowing = [...countryData].sort((a, b) => b.growth - a.growth).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Geographic Insights</h2>
        <p className="text-zinc-400 mt-1">Regional viewership and growth metrics</p>
      </div>

      {/* Top Countries Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topCountries.map((country, index) => (
          <Card key={country.country} className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                #{index + 1} Country
              </CardTitle>
              <Globe className="w-4 h-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{country.flag}</span>
                <div className="text-xl font-bold text-white">{country.country}</div>
              </div>
              <p className="text-sm text-zinc-400">
                {country.viewers.toLocaleString()} viewers
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">+{country.growth}% growth</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Country Rankings Table */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">All Countries by Viewership</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-zinc-400">Rank</TableHead>
                <TableHead className="text-zinc-400">Country</TableHead>
                <TableHead className="text-zinc-400 text-right">Viewers</TableHead>
                <TableHead className="text-zinc-400 text-right">Growth Rate</TableHead>
                <TableHead className="text-zinc-400 text-right">Market Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countryData.map((country, index) => {
                const totalViewers = countryData.reduce((sum, c) => sum + c.viewers, 0);
                const marketShare = ((country.viewers / totalViewers) * 100).toFixed(1);

                return (
                  <TableRow key={country.country} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium text-white">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{country.flag}</span>
                        <span className="font-semibold text-white">{country.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-zinc-300">
                      {country.viewers.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={country.growth > 7 ? "text-green-500" : "text-yellow-500"}>
                        +{country.growth}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-white font-semibold">
                      {marketShare}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Viewers by Country */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Viewers by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis type="number" stroke="#a1a1aa" />
                <YAxis dataKey="country" type="category" stroke="#a1a1aa" width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="viewers" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Rate Comparison */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Fastest Growing Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={fastestGrowing}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="country" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#00000080", border: "1px solid #ffffff20", backdropFilter: "blur(12px)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="growth" fill="#10b981" name="Growth %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Regional Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">North America</span>
                  <span className="text-sm font-semibold text-white">98M viewers</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "33%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Latin America</span>
                  <span className="text-sm font-semibold text-white">73M viewers</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Europe</span>
                  <span className="text-sm font-semibold text-white">91M viewers</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-300">Asia-Pacific</span>
                  <span className="text-sm font-semibold text-white">92M viewers</span>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "31%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">
                      Emerging Markets
                    </div>
                    <div className="text-xs text-zinc-400">
                      India leads with 12.3% growth, followed by South Korea at 9.1%
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">
                      Largest Markets
                    </div>
                    <div className="text-xs text-zinc-400">
                      US, India, and Brazil account for 53% of total viewership
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">
                      Growth Opportunity
                    </div>
                    <div className="text-xs text-zinc-400">
                      Asian markets showing strongest growth potential overall
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
