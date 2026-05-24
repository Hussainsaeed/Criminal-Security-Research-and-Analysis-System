import ScanTarget from '@/components/ScanTarget';

const stats = [
  { label: 'Total Scans', value: '47' },
  { label: 'Critical Vulns', value: '3', color: '#ff4d6d' },
  { label: 'High / Med', value: '21', color: '#ff8a3d' },
  { label: 'System Load', value: '0.62', color: 'rgba(94,255,169,0.95)' }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
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
        <ScanTarget />
      </div>
    </div>
  );
}

