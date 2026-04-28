import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chat, TaskComplete, Code, Settings, Collaborate, UserMultiple,
  Checkmark, Subtract, ArrowRight, FolderOpen, Document,
} from '@carbon/icons-react';
import { bobModes, customModeExamples } from '@content/bob-modes';
import { ModeChip } from '@components/ui/ModeChip';
import type { BobModeKey } from '@lib/types';

const modeIconMap: Record<string, typeof Chat> = {
  Chat, TaskComplete, Code, Settings, Collaborate, UserMultiple,
};

// Tool access matrix — based on IBM Bob official docs
type ToolKey = 'Read' | 'Write' | 'Execute' | 'Browser' | 'MCP' | 'Skills';
type AccessLevel = 'full' | 'limited' | 'none' | 'delegates';

const toolMatrix: Record<BobModeKey, Record<ToolKey, AccessLevel>> = {
  ask:          { Read: 'full',      Write: 'none',    Execute: 'none',      Browser: 'full',  MCP: 'none',  Skills: 'none' },
  plan:         { Read: 'full',      Write: 'limited', Execute: 'none',      Browser: 'none',  MCP: 'none',  Skills: 'none' },
  code:         { Read: 'full',      Write: 'full',    Execute: 'full',      Browser: 'none',  MCP: 'none',  Skills: 'none' },
  advanced:     { Read: 'full',      Write: 'full',    Execute: 'full',      Browser: 'full',  MCP: 'full',  Skills: 'full' },
  orchestrator: { Read: 'delegates', Write: 'delegates', Execute: 'delegates', Browser: 'delegates', MCP: 'delegates', Skills: 'delegates' },
  custom:       { Read: 'full',      Write: 'full',    Execute: 'full',      Browser: 'full',  MCP: 'full',  Skills: 'full' },
};

const toolLabels: Record<ToolKey, string> = {
  Read: 'Read', Write: 'Write', Execute: 'Execute', Browser: 'Browser', MCP: 'MCP', Skills: 'Skills',
};

const toolDesc: Record<ToolKey, string> = {
  Read: 'Đọc file, codebase',
  Write: 'Edit / tạo file',
  Execute: 'Chạy lệnh shell',
  Browser: 'Truy cập web',
  MCP: 'GitHub, Jira, CI/CD…',
  Skills: '.bob/skills/ custom',
};

function AccessIcon({ level }: { level: AccessLevel }) {
  if (level === 'full') return <Checkmark size={14} className="text-carbon-green-50" />;
  if (level === 'limited') return (
    <span className="text-[10px] font-semibold text-carbon-yellow-30 leading-none">.md</span>
  );
  if (level === 'delegates') return (
    <span className="text-[10px] text-carbon-blue-60 font-mono leading-none">→</span>
  );
  return <Subtract size={14} className="text-carbon-gray-30" />;
}

// Orchestrator delegation flow data
const orchestratorFlow = [
  { mode: 'Plan', color: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-700', task: 'Đọc spec, tạo plan' },
  { mode: 'Code', color: 'bg-teal-500/10 border-teal-500/40 text-teal-700', task: 'Implement theo plan' },
  { mode: 'Advanced', color: 'bg-purple-500/10 border-purple-500/40 text-purple-700', task: 'Review + test + docs' },
];

export default function ModesSection() {
  const [activeMode, setActiveMode] = useState<BobModeKey>('code');
  const currentMode = bobModes.find((m) => m.key === activeMode) ?? bobModes[0];

  return (
    <section id="modes" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="section-heading">Modes — chọn vai trò phù hợp cho từng task</h2>
          <p className="section-subheading">
            Mỗi mode giới hạn quyền hạn tool khác nhau — Bob chỉ làm đúng những gì mode cho phép.
            5 mode sẵn có: <strong>Code</strong>, <strong>Ask</strong>, <strong>Plan</strong>,{' '}
            <strong>Advanced</strong>, <strong>Orchestrator</strong>. Custom Mode cho phép team tạo thêm persona với instruction và permission riêng.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Mode selector */}
          <div className="lg:col-span-2 space-y-2">
            {bobModes.map((mode, i) => (
              <motion.button
                key={mode.key}
                onClick={() => setActiveMode(mode.key)}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`w-full text-left p-4 border transition-all duration-200 ${
                  activeMode === mode.key
                    ? 'border-carbon-blue-60 bg-carbon-blue-60/5'
                    : 'border-carbon-gray-20 bg-white hover:border-carbon-blue-60/40 hover:bg-blue-50/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  {(() => { const Icon = modeIconMap[mode.icon]; return Icon ? <Icon size={16} className="text-carbon-gray-60 flex-shrink-0" /> : null; })()}
                  <ModeChip modeKey={mode.key} label={mode.displayName} />
                  {mode.isCustom && (
                    <span className="text-[11px] text-carbon-gray-50 border border-carbon-gray-30 px-1.5 py-0.5">
                      extensible
                    </span>
                  )}
                </div>
                <p className="text-caption text-carbon-gray-70">{mode.shortDesc}</p>
              </motion.button>
            ))}
          </div>

          {/* Mode detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-carbon-gray-20 p-6 h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  {(() => { const Icon = modeIconMap[currentMode.icon]; return Icon ? (
                    <div className="w-10 h-10 bg-carbon-blue-60/10 border border-carbon-blue-60/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-carbon-blue-60" />
                    </div>
                  ) : null; })()}
                  <ModeChip modeKey={currentMode.key} label={currentMode.displayName} size="md" />
                </div>

                <h3 className="text-heading-4 font-semibold text-carbon-gray-100 mb-3">
                  {currentMode.displayName}
                </h3>

                <p className="text-body text-carbon-gray-70 mb-4">{currentMode.shortDesc}</p>

                <div className="border-t border-carbon-gray-20 pt-4">
                  <div className="text-caption font-semibold text-carbon-gray-50 uppercase tracking-wider mb-2">
                    Khi nào dùng
                  </div>
                  <p className="text-caption text-carbon-gray-70 leading-relaxed">
                    {currentMode.whenToUse}
                  </p>
                </div>

                {currentMode.examplePrompt && (
                  <div className="mt-4 p-3 bg-carbon-gray-10 border border-carbon-gray-20">
                    <div className="text-[11px] font-semibold text-carbon-gray-50 uppercase tracking-wider mb-1.5">
                      Ví dụ prompt
                    </div>
                    <p className="font-mono text-caption text-carbon-gray-100 italic">
                      &ldquo;{currentMode.examplePrompt}&rdquo;
                    </p>
                  </div>
                )}

                {/* Orchestrator delegation flow */}
                {currentMode.key === 'orchestrator' && (
                  <div className="mt-5 border-t border-carbon-gray-20 pt-4">
                    <div className="text-[11px] font-semibold text-carbon-gray-50 uppercase tracking-wider mb-3">
                      Cách Orchestrator hoạt động
                    </div>
                    <div className="p-4 bg-carbon-gray-10 border border-carbon-gray-20">
                      {/* Input */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 px-3 py-2 bg-carbon-gray-80 border border-carbon-gray-70">
                          <span className="font-mono text-[11px] text-carbon-gray-30 italic">
                            &ldquo;Từ SPEC.md, scaffold → implement → test → document&rdquo;
                          </span>
                        </div>
                      </div>
                      {/* Arrow down */}
                      <div className="flex justify-center mb-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-px h-4 bg-carbon-gray-40" />
                          <div className="w-6 h-6 bg-carbon-gray-80 border border-carbon-gray-70 flex items-center justify-center">
                            <Collaborate size={14} className="text-white" />
                          </div>
                          <div className="text-[10px] text-carbon-gray-50 font-semibold">ORCHESTRATOR</div>
                          <div className="w-px h-4 bg-carbon-gray-40" />
                        </div>
                      </div>
                      {/* Sub-modes */}
                      <div className="grid grid-cols-3 gap-2">
                        {orchestratorFlow.map((item, i) => (
                          <div key={item.mode} className="relative">
                            {i > 0 && (
                              <div className="absolute -left-1 top-1/2 -translate-y-1/2 z-10">
                                <ArrowRight size={10} className="text-carbon-gray-40" />
                              </div>
                            )}
                            <div className={`p-2 border text-center ${item.color}`}>
                              <div className="text-[11px] font-semibold mb-0.5">{item.mode}</div>
                              <div className="text-[10px] opacity-75">{item.task}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-carbon-gray-50 mt-3 text-center">
                        Orchestrator tự động chọn mode phù hợp — không cần switch thủ công
                      </p>
                    </div>
                  </div>
                )}

                {/* Custom Mode: examples + Skills file structure */}
                {currentMode.key === 'custom' && (
                  <div className="mt-5 border-t border-carbon-gray-20 pt-4 space-y-5">
                    {/* Examples grid */}
                    <div>
                      <div className="text-[11px] font-semibold text-carbon-gray-50 uppercase tracking-wider mb-3">
                        Custom Mode examples
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {customModeExamples.map((ex) => (
                          <div
                            key={ex.name}
                            className="p-3 bg-carbon-gray-10 border border-carbon-gray-20"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-caption font-semibold text-carbon-gray-100">
                                {ex.name}
                              </span>
                              <span className="text-[11px] text-carbon-gray-50 border border-carbon-gray-30 px-1.5 py-0.5">
                                {ex.scope}
                              </span>
                            </div>
                            <p className="text-[11px] text-carbon-gray-60 leading-relaxed">
                              {ex.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills file structure */}
                    <div>
                      <div className="text-[11px] font-semibold text-carbon-gray-50 uppercase tracking-wider mb-3">
                        Skills — cấu trúc file (.bob/)
                      </div>
                      <div className="bg-carbon-gray-90 border border-carbon-gray-80 p-4">
                        {/* Directory tree */}
                        <div className="font-mono text-[11px] space-y-1 mb-4">
                          <div className="flex items-center gap-2 text-carbon-gray-30">
                            <FolderOpen size={12} className="text-carbon-yellow-30 flex-shrink-0" />
                            <span>.bob/</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            <div className="flex items-center gap-2 text-carbon-gray-30">
                              <FolderOpen size={12} className="text-carbon-yellow-30 flex-shrink-0" />
                              <span>skills/</span>
                            </div>
                            {customModeExamples.map((ex) => (
                              <div key={ex.name} className="pl-4 space-y-0.5">
                                <div className="flex items-center gap-2 text-carbon-gray-40">
                                  <FolderOpen size={11} className="text-carbon-gray-50 flex-shrink-0" />
                                  <span className="text-carbon-gray-30">
                                    {ex.name.toLowerCase().replace(/\s+/g, '-')}/
                                  </span>
                                  <span className="text-[10px] text-carbon-gray-60 border border-carbon-gray-70 px-1">
                                    {ex.scope}
                                  </span>
                                </div>
                                <div className="pl-4 flex items-center gap-2 text-carbon-gray-50">
                                  <Document size={11} className="text-carbon-blue-40 flex-shrink-0" />
                                  <span>SKILL.md</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* SKILL.md mock content */}
                        <div className="border-t border-carbon-gray-80 pt-3">
                          <div className="text-[10px] text-carbon-gray-60 mb-2">
                            Ví dụ: <span className="text-carbon-blue-40">.bob/skills/test-generator/SKILL.md</span>
                          </div>
                          <pre className="font-mono text-[10px] text-carbon-gray-10 whitespace-pre leading-relaxed">{`# Test Generator
## Role
Sinh pytest test theo convention của team.

## Rules
- Happy path + edge case + error path
- Dùng fixtures trong conftest.py có sẵn
- Không mock database — dùng test DB thật

## Tool permissions
- Read: all files
- Write: tests/ directory only`}</pre>
                        </div>
                      </div>
                      <p className="text-[11px] text-carbon-gray-50 mt-2">
                        Skills được đọc tự động khi Bob khởi động session trong project. Project-level override global.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tool Permission Matrix — Idea 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white border border-carbon-gray-20 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-carbon-gray-20 bg-carbon-gray-10 flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-body font-semibold text-carbon-gray-100">
              Tool Access — quyền hạn theo Mode
            </h3>
            <div className="flex items-center gap-4 text-[11px] text-carbon-gray-60">
              <span className="flex items-center gap-1.5">
                <Checkmark size={12} className="text-carbon-green-50" /> Đầy đủ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-carbon-yellow-30">.md</span> Chỉ markdown
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] text-carbon-blue-60 font-mono">→</span> Delegate sub-mode
              </span>
              <span className="flex items-center gap-1.5">
                <Subtract size={12} className="text-carbon-gray-30" /> Không có
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-carbon-gray-20 bg-carbon-gray-10">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-carbon-gray-60 uppercase tracking-wider w-40">
                    Tool
                  </th>
                  {bobModes.filter(m => m.key !== 'custom').map((m) => (
                    <th key={m.key} className="px-4 py-3 text-center">
                      <ModeChip modeKey={m.key} label={m.displayName} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(Object.keys(toolLabels) as ToolKey[]).map((tool, i) => (
                  <tr
                    key={tool}
                    className={`border-b border-carbon-gray-20 ${i % 2 === 0 ? 'bg-white' : 'bg-carbon-gray-10/50'}`}
                  >
                    <td className="px-5 py-3">
                      <div className="text-caption font-semibold text-carbon-gray-100">{toolLabels[tool]}</div>
                      <div className="text-[11px] text-carbon-gray-50">{toolDesc[tool]}</div>
                    </td>
                    {bobModes.filter(m => m.key !== 'custom').map((m) => (
                      <td key={m.key} className="px-4 py-3 text-center">
                        <div className="flex justify-center items-center h-5">
                          <AccessIcon level={toolMatrix[m.key][tool]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-carbon-gray-10 border-t border-carbon-gray-20">
            <p className="text-[11px] text-carbon-gray-60 italic">
              * Custom Mode có thể cấu hình từng permission riêng trong SKILL.md.
              Nguồn: IBM Bob official documentation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
