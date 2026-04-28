import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApprovalToggle } from '@components/ui/ApprovalToggle';
import { CheckmarkFilled, Warning, FolderOpen, Edit, Terminal, Globe, Connect, Chemistry } from '@carbon/icons-react';

type ActionType = 'Read' | 'Write' | 'Execute' | 'Browser' | 'MCP' | 'Skills';

interface ActionConfig {
  label: ActionType;
  risk: 'low' | 'medium' | 'high';
  riskLabel: string;
  Icon: typeof FolderOpen;
  example: string;
}

const actionTypes: ActionConfig[] = [
  { label: 'Read',    risk: 'low',    riskLabel: 'Thấp',       Icon: FolderOpen, example: 'Đọc risk_calc.py' },
  { label: 'Write',   risk: 'high',   riskLabel: 'Cao',        Icon: Edit,       example: 'Ghi app.py' },
  { label: 'Execute', risk: 'high',   riskLabel: 'Cao',        Icon: Terminal,   example: 'pytest tests/' },
  { label: 'Browser', risk: 'high',   riskLabel: 'Cao',        Icon: Globe,      example: 'Mở Pandas docs' },
  { label: 'MCP',     risk: 'medium', riskLabel: 'Trung bình', Icon: Connect,    example: 'Tạo PR trên GitHub' },
  { label: 'Skills',  risk: 'medium', riskLabel: 'Trung bình', Icon: Chemistry,  example: 'Chạy Security Reviewer' },
];

interface WorkflowStep {
  action: ActionType;
  title: string;
  desc: string;
}

const workflowSteps: WorkflowStep[] = [
  { action: 'Read',    title: 'Bob đọc codebase',       desc: 'Phân tích risk_calc.py, requirements.txt' },
  { action: 'Write',   title: 'Bob implement code',      desc: 'Tạo / chỉnh sửa source files' },
  { action: 'Execute', title: 'Bob chạy tests',          desc: 'pytest tests/ — verify logic' },
  { action: 'Browser', title: 'Bob tra cứu docs',        desc: 'Mở Pandas, Streamlit documentation' },
  { action: 'MCP',     title: 'Bob tạo Pull Request',    desc: 'Gọi GitHub MCP — tạo PR với description' },
  { action: 'Skills',  title: 'Bob chạy Security Review', desc: 'Dùng Skill: Security Reviewer (.bob/)' },
];

function riskColor(risk: 'low' | 'medium' | 'high') {
  if (risk === 'low') return 'text-carbon-green-50 bg-carbon-green-50/10 border-carbon-green-50/30';
  if (risk === 'medium') return 'text-[#b28600] bg-yellow-50/30 border-yellow-400/30';
  return 'text-carbon-red-60 bg-carbon-red-60/10 border-carbon-red-60/20';
}

export default function ApprovalSection() {
  const [globalMode, setGlobalMode] = useState<'manual' | 'autonomous'>('manual');
  const [autoApprovedActions, setAutoApprovedActions] = useState<Set<ActionType>>(new Set());

  const toggleAction = (action: ActionType) => {
    setAutoApprovedActions((prev) => {
      const next = new Set(prev);
      if (next.has(action)) next.delete(action);
      else next.add(action);
      return next;
    });
  };

  const isGlobalAuto = globalMode === 'autonomous';

  const isAutoApproved = (action: ActionType) =>
    isGlobalAuto || autoApprovedActions.has(action);

  const approvedCount = isGlobalAuto
    ? actionTypes.length
    : autoApprovedActions.size;

  return (
    <section id="approval" className="bg-white section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="section-heading">Bạn kiểm soát mức độ tự động</h2>
          <p className="section-subheading">
            Mặc định Bob hỏi trước khi thực thi bất kỳ action nào. Tính năng <strong>Auto-Approve</strong> trong
            Bob Settings cho phép bật/tắt xác nhận theo từng loại action cụ thể — không phải all-or-nothing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Controls */}
          <div className="space-y-6">

            {/* Global toggle */}
            <div className="p-5 bg-carbon-gray-10 border border-carbon-gray-20">
              <ApprovalToggle mode={globalMode} onChange={setGlobalMode} showDescription />
            </div>

            {/* Granular action toggles */}
            <div className={`border transition-colors duration-200 ${isGlobalAuto ? 'border-carbon-gray-20 opacity-60' : 'border-carbon-gray-20'}`}>
              <div className="px-5 py-3 border-b border-carbon-gray-20 bg-carbon-gray-10 flex items-center justify-between">
                <span className="text-caption font-semibold text-carbon-gray-100">
                  Granular Auto-Approve
                </span>
                <span className="text-[11px] text-carbon-gray-60">
                  {approvedCount}/{actionTypes.length} action tự động
                </span>
              </div>

              {isGlobalAuto && (
                <div className="px-5 py-2 bg-carbon-yellow-30/10 border-b border-carbon-yellow-30/30">
                  <p className="text-[11px] text-[#b28600]">
                    Auto-Approve bật toàn bộ — granular settings bị ghi đè.
                  </p>
                </div>
              )}

              <div className="divide-y divide-carbon-gray-20">
                {actionTypes.map((act) => {
                  const checked = isAutoApproved(act.label);
                  return (
                    <button
                      key={act.label}
                      onClick={() => !isGlobalAuto && toggleAction(act.label)}
                      disabled={isGlobalAuto}
                      className={`w-full text-left px-5 py-3 flex items-center gap-4 transition-colors duration-150 ${
                        isGlobalAuto ? 'cursor-default' : 'hover:bg-carbon-gray-10 cursor-pointer'
                      }`}
                    >
                      {/* Checkbox visual */}
                      <div className={`w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        checked ? 'bg-carbon-blue-60 border-carbon-blue-60' : 'border-carbon-gray-40 bg-white'
                      }`}>
                        {checked && <CheckmarkFilled size={10} className="text-white" />}
                      </div>

                      {/* Icon + label */}
                      <act.Icon size={14} className="text-carbon-gray-60 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-caption font-semibold text-carbon-gray-100">
                            {act.label}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 border rounded-sm font-medium ${riskColor(act.risk)}`}>
                            {act.riskLabel}
                          </span>
                        </div>
                        <span className="text-[11px] text-carbon-gray-50">{act.example}</span>
                      </div>

                      {/* Status */}
                      <span className={`text-[10px] font-medium flex-shrink-0 ${checked ? 'text-carbon-green-50' : 'text-carbon-gray-50'}`}>
                        {checked ? 'Auto' : 'Confirm'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Banking recommendation */}
            <div className="p-5 bg-carbon-gray-10 border border-carbon-gray-20">
              <h4 className="text-body font-semibold text-carbon-gray-100 mb-2">
                Khuyến nghị cho môi trường production
              </h4>
              <p className="text-caption text-carbon-gray-70 leading-relaxed">
                Bật Auto-Approve chỉ cho <strong>Read</strong> — giảm friction khi Bob cần đọc nhiều file.
                Giữ <strong>Write/Execute</strong> ở Confirm cho task production. IBM khuyến cáo không bật
                Auto-Approve cho Execute trong môi trường production vì nguy cơ mất dữ liệu.
              </p>
            </div>
          </div>

          {/* Right: Live workflow preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 bg-carbon-gray-10 border border-carbon-gray-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold text-carbon-gray-100">
                  Preview: Bob implement feature
                </h3>
                <span className={`text-[11px] px-2 py-1 font-medium border ${
                  isGlobalAuto
                    ? 'bg-carbon-yellow-30/20 text-[#b28600] border-carbon-yellow-30/40'
                    : approvedCount === 0
                    ? 'bg-carbon-blue-60/10 text-carbon-blue-60 border-carbon-blue-60/30'
                    : 'bg-carbon-gray-20 text-carbon-gray-70 border-carbon-gray-30'
                }`}>
                  {isGlobalAuto ? 'Tất cả tự động' : approvedCount === 0 ? 'Tất cả cần confirm' : `${approvedCount} tự động`}
                </span>
              </div>

              <AnimatePresence mode="sync">
                <div className="space-y-0">
                  {workflowSteps.map((step, i) => {
                    const auto = isAutoApproved(step.action);
                    return (
                      <div key={step.action} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <motion.div
                            animate={{ backgroundColor: auto ? '#24a148' : '#0f62fe' }}
                            transition={{ duration: 0.2 }}
                            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                          >
                            {auto
                              ? <CheckmarkFilled size={14} className="text-white" />
                              : <Warning size={14} className="text-white" />
                            }
                          </motion.div>
                          {i < workflowSteps.length - 1 && (
                            <div className="w-px h-6 bg-carbon-gray-30" />
                          )}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-caption font-semibold text-carbon-gray-100">
                              {step.title}
                            </span>
                            <motion.span
                              key={`${step.action}-${auto}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`text-[10px] px-1.5 py-0.5 font-semibold border ${
                                auto
                                  ? 'bg-carbon-green-50/10 text-carbon-green-50 border-carbon-green-50/30'
                                  : 'bg-carbon-blue-60/10 text-carbon-blue-60 border-carbon-blue-60/30'
                              }`}
                            >
                              {auto ? `AUTO (${step.action})` : `CONFIRM (${step.action})`}
                            </motion.span>
                          </div>
                          <p className="text-[11px] text-carbon-gray-60 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatePresence>

              <div className="mt-3 pt-3 border-t border-carbon-gray-20 flex items-center gap-2">
                <CheckmarkFilled size={12} className="text-carbon-green-50" />
                <span className="text-[11px] text-carbon-gray-60">Auto-execute</span>
                <Warning size={12} className="text-carbon-blue-60 ml-3" />
                <span className="text-[11px] text-carbon-gray-60">Cần xác nhận</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
