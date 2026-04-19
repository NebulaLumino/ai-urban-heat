'use client';

import { useState } from 'react';

const ACCENT = 'text-yellow-400';
const ACCENT_BG = 'bg-yellow-500';

export default function UrbanHeatPage() {
  const [form, setForm] = useState({
    city: '',
    population: '500000',
    climateZone: 'Hot-Humid',
    surfaceType: 'Asphalt + Concrete',
    greenSpace: '12',
    trafficDensity: 'High',
    industrialPresence: 'Moderate',
    targetTemperatureReduction: '2',
    description: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${ACCENT} text-sm font-medium mb-4 uppercase tracking-widest`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Environmental AI Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={ACCENT}>Urban Heat Island</span> Mitigation Planner
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI-powered urban heat island analysis, cool infrastructure planning, green infrastructure strategies, and temperature reduction roadmaps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Urban Area Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City / Metropolitan Area</label>
                <input name="city" type="text" value={form.city} onChange={handleChange}
                  placeholder="e.g. Phoenix, AZ metropolitan area"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Population</label>
                  <input name="population" type="number" value={form.population} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Climate Zone</label>
                  <select name="climateZone" value={form.climateZone} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
                    <option>Hot-Humid</option><option>Hot-Dry</option><option>Warm-Humid</option>
                    <option>Warm-Dry</option><option>Mixed-Humid</option><option>Cool-Marine</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Dominant Surface Type</label>
                  <select name="surfaceType" value={form.surfaceType} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
                    <option>Asphalt + Concrete</option><option>Predominantly Impervious</option>
                    <option>Mixed Urban</option><option>Green/Blue Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Green Space (%)</label>
                  <input name="greenSpace" type="number" min="0" max="100" value={form.greenSpace} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Traffic Density</label>
                  <select name="trafficDensity" value={form.trafficDensity} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
                    <option>High</option><option>Moderate</option><option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Industrial Presence</label>
                  <select name="industrialPresence" value={form.industrialPresence} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
                    <option>High</option><option>Moderate</option><option>Low</option><option>None</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Target Temperature Reduction (°C)</label>
                <input name="targetTemperatureReduction" type="number" value={form.targetTemperatureReduction} onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Notes</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="Known heat-vulnerable neighborhoods, existing tree canopy data, budget constraints..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className={`w-full ${ACCENT_BG} hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20`}>
                {loading ? 'Planning Heat Mitigation Strategies...' : 'Generate Urban Heat Mitigation Plan'}
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Mitigation Plan & Cool Infrastructure</h2>
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mb-4" />
                <p>Modeling heat island mitigation scenarios...</p>
              </div>
            )}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <p className="text-center">Enter your urban area parameters to generate a comprehensive heat island mitigation plan.</p>
              </div>
            )}
            {result && (
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="bg-gray-900/80 rounded-xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[600px]">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-xs">
          Powered by DeepSeek AI · Next.js 16 · Tailwind CSS
        </div>
      </div>
    </div>
  );
}
