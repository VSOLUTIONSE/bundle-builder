'use client';

import dynamic from 'next/dynamic';

const AgentationTool = dynamic(
  () => import('agentation').then(mod => ({ default: mod.Agentation })),
  { ssr: false },
);

export default function DevAgentation() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <AgentationTool />;
}
