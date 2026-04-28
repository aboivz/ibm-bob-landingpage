import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Tag } from '@carbon/react';
import { Document, Code, Diagram, TestTool, CheckmarkFilled } from '@carbon/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBlock } from './CodeBlock';
import type { Artifact } from '@lib/types';

interface ArtifactViewerProps {
  artifact: Artifact;
  approvalGate?: boolean;
  approvalMode?: 'manual' | 'autonomous';
}

const artifactIcons = {
  code: Code,
  spec: Document,
  diagram: Diagram,
  'review-findings': TestTool,
  test: TestTool,
  docs: Document,
  config: Code,
};

const artifactLabels: Record<Artifact['type'], string> = {
  code: 'Code',
  spec: 'Spec',
  diagram: 'Diagram',
  'review-findings': 'Review Findings',
  test: 'Tests',
  docs: 'Docs',
  config: 'Config',
};

export function ArtifactViewer({ artifact, approvalGate, approvalMode = 'manual' }: ArtifactViewerProps) {
  const [approved, setApproved] = useState(false);
  const IconComponent = artifactIcons[artifact.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-sm border border-carbon-gray-20 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-carbon-gray-10 border-b border-carbon-gray-20">
        <IconComponent size={16} className="text-carbon-blue-60 flex-shrink-0" />
        <span className="font-mono text-caption font-medium text-carbon-gray-100">
          {artifact.filename}
        </span>
        <Tag type="outline" size="sm">
          {artifactLabels[artifact.type]}
        </Tag>
      </div>

      {approvalGate && approvalMode === 'manual' && !approved && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 bg-carbon-yellow-30 border-b border-[#d4a600] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-caption font-medium text-carbon-gray-100">
                Bob yêu cầu xác nhận (Auto-Approve: Tắt):
              </span>
              <code className="font-mono text-caption bg-black/10 px-1.5 py-0.5 rounded-sm">
                {artifact.filename}
              </code>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setApproved(true)}
                className="px-3 py-1 bg-carbon-gray-100 text-white text-caption font-medium hover:bg-carbon-gray-90 transition-colors"
              >
                Duyệt
              </button>
              <button className="px-3 py-1 border border-carbon-gray-100 text-carbon-gray-100 text-caption font-medium hover:bg-carbon-gray-20 transition-colors">
                Từ chối
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {approvalGate && approved && (
        <div className="px-4 py-2 bg-carbon-green-50/10 border-b border-carbon-green-50/30 flex items-center gap-2">
          <CheckmarkFilled size={14} className="text-carbon-green-50" />
          <span className="text-caption text-carbon-green-50 font-medium">Đã xác nhận — Bob thực thi</span>
        </div>
      )}

      {approvalGate && approvalMode === 'autonomous' && (
        <div className="px-4 py-2 bg-carbon-blue-60/10 border-b border-carbon-blue-60/30">
          <span className="text-caption text-carbon-blue-60">
            Auto-Approve: Bật — Bob tự thực thi không cần xác nhận
          </span>
        </div>
      )}

      <div className="p-0">
        <Tabs>
          <TabList aria-label="Artifact content tabs">
            <Tab>Nội dung</Tab>
            {artifact.highlights && artifact.highlights.length > 0 && (
              <Tab>Điểm chú ý ({artifact.highlights.length})</Tab>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              <CodeBlock
                code={artifact.content}
                language={artifact.language ?? 'text'}
                maxHeight="380px"
              />
            </TabPanel>
            {artifact.highlights && artifact.highlights.length > 0 && (
              <TabPanel>
                <div className="divide-y divide-carbon-gray-20">
                  {artifact.highlights.map((h, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-caption text-carbon-gray-50">
                          L{h.lineStart}–{h.lineEnd}
                        </span>
                      </div>
                      <p className="text-caption text-carbon-gray-70">{h.note}</p>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </div>
    </motion.div>
  );
}
