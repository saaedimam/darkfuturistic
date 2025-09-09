import React from 'react';
import { Card } from '../ui/card';
import { ParticleBackground } from '../ParticleBackground';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, ChevronUp, ChevronDown } from 'lucide-react';

export function DashboardPage() {
  const revenueData = [
    { month: 'Jan', revenue: 45000, users: 1200 },
    { month: 'Feb', revenue: 52000, users: 1350 },
    { month: 'Mar', revenue: 48000, users: 1280 },
    { month: 'Apr', revenue: 61000, users: 1520 },
    { month: 'May', revenue: 55000, users: 1450 },
    { month: 'Jun', revenue: 67000, users: 1680 },
  ];

  const performanceData = [
    { name: 'API Calls', value: 45, color: '#00BFA6' },
    { name: 'Database', value: 25, color: '#FF7F3F' },
    { name: 'Cache', value: 20, color: '#3B82F6' },
    { name: 'CDN', value: 10, color: '#8B5CF6' },
  ];

  const trafficData = [
    { time: '00:00', organic: 1200, paid: 800, direct: 600 },
    { time: '04:00', organic: 1100, paid: 750, direct: 550 },
    { time: '08:00', organic: 1800, paid: 1200, direct: 900 },
    { time: '12:00', organic: 2200, paid: 1500, direct: 1100 },
    { time: '16:00', organic: 2000, paid: 1300, direct: 1000 },
    { time: '20:00', organic: 1600, paid: 1000, direct: 750 },
  ];

  const stats = [
    { title: 'Total Revenue', value: '$328,000', change: '+12.5%', icon: DollarSign, positive: true },
    { title: 'Active Users', value: '1,680', change: '+8.2%', icon: Users, positive: true },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', icon: TrendingUp, positive: false },
    { title: 'Server Uptime', value: '99.9%', change: '+0.1%', icon: Activity, positive: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={30} connectionDistance={80} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2 font-outfit">Dashboard Overview</h1>
          <p className="text-slate-400 font-inter">Monitor your business metrics and performance indicators</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6]/20 to-[#FF7F3F]/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="text-[#00BFA6]" size={24} />
                </div>
                <div className={`flex items-center gap-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="font-inter">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 mb-1 font-inter">{stat.title}</p>
                <p className="text-2xl text-white font-outfit">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
            <h3 className="text-xl text-white mb-6 font-outfit">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00BFA6" 
                  strokeWidth={3}
                  dot={{ fill: '#00BFA6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#00BFA6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Pie Chart */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
            <h3 className="text-xl text-white mb-6 font-outfit">System Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Traffic Chart */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 mb-8">
          <h3 className="text-xl text-white mb-6 font-outfit">Traffic Sources (24h)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Area 
                type="monotone" 
                dataKey="organic" 
                stackId="1" 
                stroke="#00BFA6" 
                fill="#00BFA6" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="paid" 
                stackId="1" 
                stroke="#FF7F3F" 
                fill="#FF7F3F" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="direct" 
                stackId="1" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00BFA6] rounded-full"></div>
              <span className="text-slate-300 font-inter">Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF7F3F] rounded-full"></div>
              <span className="text-slate-300 font-inter">Paid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-slate-300 font-inter">Direct</span>
            </div>
          </div>
        </Card>

        {/* User Activity Bar Chart */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
          <h3 className="text-xl text-white mb-6 font-outfit">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Bar dataKey="users" fill="#FF7F3F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
