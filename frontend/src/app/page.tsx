'use client';

import { useMemo, useState } from 'react';

import ScanTarget from '@/components/ScanTarget';
import type { ApiResponse, ScanSummary } from '@/app/scan/_types';

type Stats = {
  totalScans: number;
  criticalVulns: number;
  highMedVulns: number;
  systemLoad: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalScans: 0,
    criticalVulns: 0,
    highMedVulns: 0,
    systemLoad: 0.62
  });

  const kpiCards = useMemo(
    () => [
      {
        label: 'Total Scans',
        value: stats.totalScans.toString(),
        color: 'rgba(94,255,169,0.95)'
      },
      {
        label: 'Critical Vulns',
        value: stats.criticalVulns.toString(),
        color: '#ff4d6d'
      },
      {
        label: 'High / Med',
        value: stats.highMedVulns.toString(),
        color: '#ff8a3d'
      },
      {
        label: 'System Load',
        value: stats.systemLoad.toFixed(2),
        color: 'rgba(94,255,169,0.95)'
      }
    ],
    [stats]
  );

  function handleScanComplete(_summary: ScanSummary, _raw: ApiResponse) {
    // Stats are incremented based on the returned scan summary.
    setStats((prev) => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      criticalVulns: prev.criticalVulns + _summary.critical,
      highMedVulns: prev.highMedVulns + _summary.high + _summary.medium
    }));
  }

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-[rgba(94,255,169,0.14)] bg-[rgba(5,9,19,0.55)] p-5"
          >
            <div className="text-xs tracking-widest text-zinc-500">{s.label.toUpperCase()}</div>
            <div className="mt-3 text-2xl sm:text-3xl font-semibold" style={{ color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Core interactive engine */}
      <div className="max-w-6xl">
        <ScanTarget onScanComplete={handleScanComplete} />
      </div>
    </div>
  );
}

