import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

let initialized = false;

function initMermaid() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#0F62FE',
      primaryTextColor: '#161616',
      primaryBorderColor: '#0353E9',
      lineColor: '#525252',
      secondaryColor: '#F4F4F4',
      tertiaryColor: '#E0E0E0',
      background: '#FFFFFF',
      mainBkg: '#F4F4F4',
      nodeBorder: '#C6C6C6',
      clusterBkg: '#E8F0FE',
      titleColor: '#161616',
      edgeLabelBackground: '#FFFFFF',
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: '14px',
    },
  });
  initialized = true;
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    initMermaid();
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    mermaid
      .render(idRef.current, chart)
      .then(({ svg }) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Diagram render error');
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 border border-carbon-red-60 rounded-sm bg-red-50">
        <p className="text-caption text-carbon-red-60">Diagram error: {error}</p>
      </div>
    );
  }

  return <div ref={containerRef} className={`mermaid-container overflow-auto ${className}`} />;
}
