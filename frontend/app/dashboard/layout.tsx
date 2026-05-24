import type { ReactNode } from 'react';
import Link from 'next/link';
import { LucideLayoutDashboard, LucideServer, LucideHardDrive, LucideSettings, LucideShield, LucidePlus } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: <LucideLayoutDashboard className="h-4 w-4" strokeWidth={2} />
  },
  {
    href: '/dashboard/servers',
    label: 'Servers',
    icon: <LucideServer className="h-4 w-4" strokeWidth={2} />
  },
  {
    href: '/dashboard/volumes',
    label: 'Volumes',
    icon: <LucideHardDrive className="h-4 w-4" strokeWidth={2} />
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <LucideSettings className="h-4 w-4" strokeWidth={2} />
  }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 opacity-60" style={{
        backgroundImage:
          'linear-gradient(to right, rgba(59,130,246,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.10) 1px, transparent 1px)'
      }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen">
          <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-zinc-800/70">
            <div className="h-16 flex items-center gap-3 px-5 border-b border-zinc-800/70 bg-black/10">
              <div className="h-10 w-10 rounded-xl border border-zinc-800/70 bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 flex items-center justify-center">
                <LucideShield className="h-5 w-5 text-[#8b5cf6]" strokeWidth={2} />
              </div>
              <div className="leading-tight">
                <div className="text-sm tracking-widest text-zinc-400">NEXUS</div>
                <div className="text-base font-semibold">OS Dashboard</div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm border border-transparent text-zinc-300 hover:border-zinc-800/80 hover:bg-zinc-900/40 transition"
                >
                  <span className="text-[#3b82f6] group-hover:text-[#8b5cf6]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="mt-6 rounded-2xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/40 to-black/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs tracking-widest text-zinc-400">SECURITY STATUS</div>
                    <div className="mt-1 text-sm font-semibold">Hardened</div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_18px_rgba(139,92,246,0.7)]" />
                </div>
                <div className="mt-2 text-xs text-zinc-500">Mock telemetry connected for MVP.</div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                  </div>
                  <div className="text-xs text-zinc-400">92%</div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/dashboard"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/60 transition"
                  >
                    <LucidePlus className="h-4 w-4" strokeWidth={2} />
                    Quick Action
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          <main className="flex-1">
            <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-zinc-800/70 bg-black/30 backdrop-blur px-4 sm:px-6 lg:px-0 h-16">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xs tracking-widest text-zinc-400">CONTROL PLANE</div>
                  <div className="text-base font-semibold">NEXUS OS</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3 rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-4 py-2">
                  <div>
                    <div className="text-xs text-zinc-400">Instances</div>
                    <div className="text-sm font-semibold text-[#3b82f6]">12</div>
                  </div>
                  <div className="h-8 w-px bg-zinc-800" />
                  <div>
                    <div className="text-xs text-zinc-400">Status</div>
                    <div className="text-sm font-semibold text-[#8b5cf6]">Healthy</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl border border-zinc-800/70 bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">U</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold leading-tight">Developer</div>
                    <div className="text-xs text-zinc-500">team@domain.dev</div>
                  </div>
                </div>
              </div>
            </header>

            <section className="py-6 lg:py-8 px-0">{children}</section>
          </main>
        </div>
      </div>
    </div>
  );
}

