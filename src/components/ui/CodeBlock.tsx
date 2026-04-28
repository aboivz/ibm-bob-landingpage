import { useEffect, useRef, useState, useCallback } from 'react';
import { CopyButton } from '@carbon/react';
import { createHighlighter } from 'shiki';
import type { Highlighter } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['python', 'typescript', 'yaml', 'markdown', 'bash', 'text', 'dockerfile'],
    });
  }
  return highlighterPromise;
}

export function CodeBlock({ code, language = 'text', filename, maxHeight = '400px' }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((hl) => {
      if (cancelled) return;
      const highlighted = hl.codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      });
      setHtml(highlighted);
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="rounded-sm overflow-hidden border border-carbon-gray-80 bg-[#0d1117]">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-carbon-gray-80 bg-carbon-gray-90">
          <span className="font-mono text-caption text-carbon-gray-30">{filename}</span>
          <CopyButton
            onClick={handleCopy}
            feedback={copied ? 'Đã copy!' : undefined}
            align="left"
          />
        </div>
      )}
      {!filename && (
        <div className="flex justify-end px-3 pt-2 bg-[#0d1117]">
          <CopyButton onClick={handleCopy} feedback={copied ? 'Đã copy!' : undefined} align="left" />
        </div>
      )}
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ maxHeight }}
      >
        {html ? (
          <div
            className="text-code [&>pre]:p-4 [&>pre]:m-0 [&>pre]:bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 text-code text-carbon-gray-30 font-mono whitespace-pre-wrap">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
