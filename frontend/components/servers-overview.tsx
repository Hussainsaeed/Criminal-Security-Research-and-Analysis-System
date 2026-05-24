'use client';

import { useEffect, useMemo, useState } from 'react';
import { Cpu, HardDrive, Network, Power, Server } from 'lucide-react';

export type ServerStatus = 'online' | 'offline';

export type ServerType =
  | 'Ubuntu 22.04'
  | 'Ubuntu 24.04'
  | 'Debian 12'
  | 'AlmaLinux 9'
  | 'Rocky Linux 9';

export type Region = 'us-east' | 'us-west' | 'eu-central' | 'ap-south' | 'sa-east';

export interface Server {
  id: string;
  name: string;
  status: ServerStatus;
  cpu: number;
  ram: number;
  ip: string;
  region: Region;
  type: ServerType;
}

type ServersApiResponse = {
  servers: Server[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

function statusPill(status: ServerStatus) {
  if (status === 'online') {
    return {
      label: 'ONLINE',
      cls: 'bg-[#3b82f6]/15 border-[#3b82f6]/35 text-[#93c5fd]'
    };
  }

  return {
    label: 'OFFLINE',
    cls: 'bg-zinc-800/60 border-zinc-700 text-zinc-400'
  };
}

function formatPercent(n: number) {
  const x = Number.isFinite(n) ? n : 0;
  return `${Math.max(0, Math.min(100, Math.round(x)))}%`;
}

function utilizationBar({ value, color }: { value: number; color: 'cpu' | 'ram' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const gradient = color === 'cpu' ? 'from-[#3b82f6] to-[#8b5cf6]' : 'from-[#8b5cf6] to-[#3b82f6]';
  const solid = color === 'cpu' ? 'bg-[#3b82f6]' : 'bg-[#8b5cf6]';

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{color === 'cpu' ? 'CPU' : 'RAM'}</span>
        <span className="text-zinc-300 font-medium">{formatPercent(pct)}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-zinc-800 border border-zinc-800/70 overflow-hidden">
        <div className={`h-full ${gradient} bg-gradient-to-r ${solid === '' ? '' : ''}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ServersOverview() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/servers`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to load servers (${res.status})`);
      }
      const data = (await res.json()) as ServersApiResponse;
      setServers(data.servers);
    } catch (e: any) {
      setError(e?.message || 'Unable to fetch servers');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    const id = window.setInterval(() => {
      // Simulate subtle realtime fluctuations for online servers.
      setServers((prev) =>
        prev.map((s) => {
          if (s.status !== 'online') return s;
          const driftCpu = (Math.random() - 0.5) * 8;
          const driftRam = (Math.random() - 0.5) * 10;
          const cpu = Math.max(0, Math.min(100, Math.round(s.cpu + driftCpu)));
          const ram = Math.max(0, Math.min(100, Math.round(s.ram + driftRam)));
          return { ...s, cpu, ram };
        })
      );
    }, 2500);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => {
    const online = servers.filter((s) => s.status === 'online');
    const offline = servers.filter((s) => s.status === 'offline');
    const avgCpu = online.length ? Math.round(online.reduce((a, s) => a + s.cpu, 0) / online.length) : 0;
    const avgRam = online.length ? Math.round(online.reduce((a, s) => a + s.ram, 0) / online.length) : 0;
    return { online: online.length, offline: offline.length, avgCpu, avgRam };
  }, [servers]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-zinc-800/70 bg-zinc-900/20 p-5 animate-pulse"
          >
            <div className="h-4 w-1/2 bg-zinc-800 rounded" />
            <div className="mt-3 h-10 w-full bg-zinc-800/70 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
        <div className="font-semibold">Servers Overview</div>
        <div className="mt-1 text-sm text-red-100/80">{error}</div>
        <button
          onClick={() => void load()}
          className="mt-3 inline-flex items-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm hover:bg-red-500/15 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MiniStat icon={<Power className="h-4 w-4" strokeWidth={2} />} label="Online" value={`${summary.online}`} />
        <MiniStat icon={<Server className="h-4 w-4" strokeWidth={2} />} label="Offline" value={`${summary.offline}`} />
        <MiniStat icon={<Network className="h-4 w-4" strokeWidth={2} />} label="Avg load" value={`${summary.avgCpu}% CPU · ${summary.avgRam}% RAM`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {servers.map((s) => {
          const pill = statusPill(s.status);

          return (
            <div
              key={s.id}
              className="group rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/30 to-black/10 p-5 hover:border-zinc-700 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm text-zinc-400">{s.region.toUpperCase()}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="font-semibold truncate">{s.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{s.type}</div>
                </div>

                <div
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider ${pill.cls}`}
                >
                  {pill.label}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {utilizationBar({ value: s.status === 'online' ? s.cpu : 0, color: 'cpu' })}
                {utilizationBar({ value: s.status === 'online' ? s.ram : 0, color: 'ram' })}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Cpu className="h-4 w-4 text-[#3b82f6]" strokeWidth={2} />
                  <span className="font-medium">{s.status === 'online' ? formatPercent(s.cpu) : '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <HardDrive className="h-4 w-4 text-[#8b5cf6]" strokeWidth={2} />
                  <span className="font-medium">{s.status === 'online' ? formatPercent(s.ram) : '—'}</span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-zinc-800/70 bg-black/20 px-4 py-3 flex items-center justify-between">
                <div className="text-xs text-zinc-500">IP Address</div>
                <div className="text-sm font-semibold text-zinc-200">{s.ip}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/20 p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl border border-zinc-800/70 bg-black/20 flex items-center justify-center text-[#3b82f6]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-zinc-500">{label}</div>
        <div className="text-sm font-semibold text-zinc-200 truncate">{value}</div>
      </div>
    </div>
  );
}

