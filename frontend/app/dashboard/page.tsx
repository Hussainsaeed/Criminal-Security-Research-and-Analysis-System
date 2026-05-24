import ServersOverview from '@/components/servers-overview';
import CreateInstanceModal from '@/components/create-instance-modal';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            Monitor compute resources and manage cloud instances. This MVP uses a mock API to demonstrate UI/UX
            patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-zinc-800/70 bg-zinc-900/20 px-4 py-2">
            <div className="text-xs text-zinc-500">Realtime</div>
            <div className="h-2 w-2 rounded-full bg-[#3b82f6] shadow-[0_0_18px_rgba(59,130,246,0.65)]" />
            <div className="text-xs text-zinc-300 font-medium">Simulated</div>
          </div>

          <CreateInstanceModal />
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active Servers" value="9" hint="Online instances" />
        <KpiCard label="CPU Load" value="41%" hint="Avg utilization" />
        <KpiCard label="RAM Load" value="58%" hint="Avg utilization" />
        <KpiCard label="Regions" value="5" hint="Multi-region" />
      </section>

      <section className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/40 to-black/20 overflow-hidden">
        <div className="px-5 sm:px-6 py-5 border-b border-zinc-800/70 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">Servers Overview</h2>
            <p className="mt-1 text-sm text-zinc-400">Status, CPU/RAM utilization, and network addressing.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-zinc-500">Tip:</span>
            <span className="text-xs text-zinc-300">Use “Create Instance” to add a mock server.</span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <ServersOverview />
        </div>
      </section>
    </div>
  );
}

function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/20 p-5 hover:bg-zinc-900/30 transition">
      <div className="text-xs tracking-widest text-zinc-500">{label.toUpperCase()}</div>
      <div className="mt-3 text-3xl font-semibold text-zinc-100">{value}</div>
      <div className="mt-2 text-sm text-zinc-400">{hint}</div>
    </div>
  );
}

