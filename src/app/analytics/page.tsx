'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Activity, BarChart3, Globe, MousePointer2, Users } from 'lucide-react';

interface Stats {
  todayHits: number;
  totalHits: number;
  topCities: { city_name: string; count: number }[];
  recentActivity: { timestamp: string; page_url: string; city_name: string; referrer: string }[];
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics/stats');
        const data: Stats = await res.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Stats Error:', err);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from('.stat-card', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [loading]);

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-light animate-pulse">Loading Quantapex Intelligence...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Quantapex Analytics
            </h1>
            <p className="text-gray-400 mt-2">Real-time visitor intelligence and SEO growth tracking.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-green-500 text-sm font-medium">Live System Active</span>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Today Visits', value: stats.todayHits, icon: Users, color: 'text-blue-400' },
            { label: 'Total Visits', value: stats.totalHits, icon: BarChart3, color: 'text-purple-400' },
            { label: 'PSEO Cities Hit', value: stats.topCities.length, icon: Globe, color: 'text-emerald-400' },
            { label: 'System Health', value: '100%', icon: Activity, color: 'text-orange-400' },
          ].map((stat, i) => (
            <div key={i} className="stat-card bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
              <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon size={80} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Cities */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe size={20} className="text-blue-400" /> Top Target Cities
            </h2>
            <div className="space-y-6">
                  {stats.topCities.map((city, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono text-sm">0{i+1}</span>
                        <span className="font-medium text-gray-200">{city.city_name}</span>
                      </div>
                      <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
                        {city.count} hits
                      </div>
                    </div>
                  ))}
              {stats.topCities.length === 0 && <div className="text-gray-600 text-sm italic">Waiting for PSEO hits...</div>}
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MousePointer2 size={20} className="text-purple-400" /> Recent User Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="pb-4 font-medium italic">Timestamp</th>
                    <th className="pb-4 font-medium">Path</th>
                    <th className="pb-4 font-medium">City</th>
                    <th className="pb-4 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.recentActivity.map((log, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 text-sm text-gray-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 text-sm text-gray-300 max-w-[200px] truncate">{log.page_url}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded border border-white/10">
                          {log.city_name}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-500 capitalize">{log.referrer}</td>
                    </tr>
                  ))}
                  {stats.recentActivity.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-600">No activity recorded yet today.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
