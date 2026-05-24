import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { url?: string };
  if (!body?.url || typeof body.url !== 'string') {
    return NextResponse.json(
      { error: { message: 'url is required' } },
      { status: 400 }
    );
  }

  // This is a frontend fallback endpoint.
  // Prefer backend: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/scan`.
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    target: body.url,
    scanId: `NX-FE-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString(),
    summary: {
      totalFindings: 3,
      critical: 0,
      high: 1,
      medium: 1,
      low: 1
    },
    vulnerabilities: [
      {
        id: 'VULN-FE-001',
        type: 'SQLi',
        severity: 'high',
        title: 'Potential SQL Injection in login parameter',
        evidence: "' OR '1'='1' -- (simulated)",
        confidence: 82
      },
      {
        id: 'VULN-FE-002',
        type: 'XSS',
        severity: 'medium',
        title: 'Reflected XSS via search parameter',
        evidence: '<script>alert(1)</script> (simulated)',
        confidence: 71
      },
      {
        id: 'VULN-FE-003',
        type: 'CSRF',
        severity: 'low',
        title: 'Missing CSRF protection on state-changing request',
        evidence: 'No anti-CSRF token observed (simulated)',
        confidence: 59
      }
    ]
  });
}

