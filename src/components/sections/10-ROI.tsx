import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartColumn, Policy, Warning } from '@carbon/icons-react';
import { ibmStats } from '@content/stats';

const roiBreakdown = [
  {
    scenario: 'Code Review',
    before: '2 ngày',
    after: '~30 phút',
    saving: '90%',
    note: 'Agentic Review với reasoning, findings có độ ưu tiên',
  },
  {
    scenario: 'Viết test từ đầu',
    before: '3 giờ',
    after: '~5 phút',
    saving: '97%',
    note: 'Custom Test Generator, cover happy + edge + error path',
  },
  {
    scenario: 'Documentation',
    before: '1 ngày',
    after: '~3 phút',
    saving: '99%',
    note: 'Docs Architect — README, API doc, ARCHITECTURE.md',
  },
  {
    scenario: 'Onboard dev mới',
    before: '3–6 tháng',
    after: 'Vài giờ',
    saving: 'sig.',
    note: 'Bob giải thích codebase, architecture, business logic theo ngữ cảnh',
  },
];

// Bobalytics mock data
const bobalyticsPeriods = ['Tuần này', 'Tháng này', 'Quý này'] as const;
type Period = (typeof bobalyticsPeriods)[number];

const teamUsage: Record<Period, { team: string; tokens: number; cost: number; prs: number; tier: 'standard' | 'premium'; capped: boolean }[]> = {
  'Tuần này': [
    { team: 'Backend',   tokens: 2840, cost: 1.42, prs: 12, tier: 'premium',  capped: false },
    { team: 'Frontend',  tokens: 1920, cost: 0.96, prs: 8,  tier: 'standard', capped: false },
    { team: 'QA',        tokens: 980,  cost: 0.49, prs: 0,  tier: 'standard', capped: true  },
    { team: 'DevOps',    tokens: 560,  cost: 0.28, prs: 3,  tier: 'standard', capped: false },
  ],
  'Tháng này': [
    { team: 'Backend',   tokens: 11200, cost: 5.60, prs: 47, tier: 'premium',  capped: false },
    { team: 'Frontend',  tokens: 7800,  cost: 3.90, prs: 31, tier: 'standard', capped: false },
    { team: 'QA',        tokens: 3900,  cost: 1.95, prs: 0,  tier: 'standard', capped: true  },
    { team: 'DevOps',    tokens: 2200,  cost: 1.10, prs: 11, tier: 'standard', capped: false },
  ],
  'Quý này': [
    { team: 'Backend',   tokens: 34100, cost: 17.05, prs: 142, tier: 'premium',  capped: false },
    { team: 'Frontend',  tokens: 23500, cost: 11.75, prs: 94,  tier: 'standard', capped: false },
    { team: 'QA',        tokens: 11800, cost: 5.90,  prs: 0,   tier: 'standard', capped: true  },
    { team: 'DevOps',    tokens: 6700,  cost: 3.35,  prs: 34,  tier: 'standard', capped: false },
  ],
};

function formatTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

export default function ROISection() {
  const [period, setPeriod] = useState<Period>('Tuần này');
  const rows = teamUsage[period];
  const maxTokens = Math.max(...rows.map((r) => r.tokens));
  const totalTokens = rows.reduce((s, r) => s + r.tokens, 0);
  const totalCost = rows.reduce((s, r) => s + r.cost, 0);
  const totalPRs = rows.reduce((s, r) => s + r.prs, 0);

  return (
    <section id="roi" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="section-heading">Số liệu thực tế từ IBM</h2>
          <p className="section-subheading">
            Đo lường từ chương trình triển khai nội bộ IBM với 10,000+ developer.
            Kết quả thực tế có thể khác nhau tùy môi trường và độ phức tạp của codebase.
          </p>
        </motion.div>

        {/* Main stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {ibmStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-carbon-gray-20 p-6 hover:border-carbon-blue-60 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl font-semibold text-carbon-blue-60 mb-1">{stat.value}</div>
              <div className="text-caption font-medium text-carbon-gray-100 mb-1">{stat.label}</div>
              {stat.sublabel && (
                <div className="text-[11px] text-carbon-gray-60 mb-3">{stat.sublabel}</div>
              )}
              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-carbon-gray-50 hover:text-carbon-blue-60 underline transition-colors"
              >
                {stat.source}
              </a>
            </motion.div>
          ))}
        </div>

        {/* ROI breakdown table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-carbon-gray-20 overflow-hidden mb-8"
        >
          <div className="px-6 py-4 border-b border-carbon-gray-20 bg-carbon-gray-10">
            <h3 className="text-body font-semibold text-carbon-gray-100">
              Ước tính tiết kiệm thời gian — per task (mô phỏng, không phải cam kết)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-carbon-gray-20">
                  <th className="text-left text-caption font-semibold text-carbon-gray-70 px-6 py-3">Task</th>
                  <th className="text-left text-caption font-semibold text-carbon-gray-70 px-4 py-3">Trước Bob</th>
                  <th className="text-left text-caption font-semibold text-carbon-gray-70 px-4 py-3">Với Bob</th>
                  <th className="text-left text-caption font-semibold text-carbon-gray-70 px-4 py-3">Tiết kiệm</th>
                  <th className="text-left text-caption font-semibold text-carbon-gray-70 px-4 py-3">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {roiBreakdown.map((row, i) => (
                  <motion.tr
                    key={row.scenario}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="border-b border-carbon-gray-20 hover:bg-carbon-gray-10 transition-colors"
                  >
                    <td className="px-6 py-3 text-caption font-semibold text-carbon-gray-100">{row.scenario}</td>
                    <td className="px-4 py-3 text-caption text-carbon-red-60">{row.before}</td>
                    <td className="px-4 py-3 text-caption text-carbon-green-50 font-medium">{row.after}</td>
                    <td className="px-4 py-3">
                      <span className="text-caption font-bold text-carbon-blue-60">{row.saving}</span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-carbon-gray-60 max-w-xs">{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-carbon-gray-10 border-t border-carbon-gray-20">
            <p className="text-[11px] text-carbon-gray-60 italic">
              * Ước tính dựa trên use case demo Loan Portfolio Risk Dashboard. Thời gian thực tế phụ thuộc vào
              độ phức tạp task, kinh nghiệm developer, và cấu hình môi trường. Số liệu 45% productivity gain từ{' '}
              <a
                href="https://www.ibm.com/think/news/meet-bob-developer-productivity"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-carbon-blue-60"
              >
                IBM Think Blog
              </a>.
            </p>
          </div>
        </motion.div>

        {/* Bobalytics — Idea 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="border border-carbon-gray-30 overflow-hidden bg-white shadow-sm"
        >
          {/* App chrome */}
          <div className="bg-[#0f2027] px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-carbon-blue-60 flex items-center justify-center flex-shrink-0">
                  <ChartColumn size={12} className="text-white" />
                </div>
                <span className="font-mono text-caption text-carbon-gray-30 font-semibold">
                  Bobalytics
                </span>
              </div>
            </div>
            <span className="text-[11px] text-carbon-gray-50 hidden sm:block">
              IBM Bob — Cost &amp; Policy Control Dashboard
            </span>
          </div>

          {/* Dashboard content */}
          <div className="bg-carbon-gray-10 p-4 md:p-5">

            {/* Period selector + summary KPIs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                {bobalyticsPeriods.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 text-caption font-medium border transition-all duration-150 ${
                      period === p
                        ? 'bg-carbon-blue-60 text-white border-carbon-blue-60'
                        : 'bg-white text-carbon-gray-70 border-carbon-gray-20 hover:border-carbon-blue-60/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-caption text-carbon-gray-60">
                <span>
                  <span className="font-semibold text-carbon-gray-100">{formatTokens(totalTokens)}</span> tokens
                </span>
                <span>
                  <span className="font-semibold text-carbon-gray-100">${totalCost.toFixed(2)}</span> cost
                </span>
                <span>
                  <span className="font-semibold text-carbon-gray-100">{totalPRs}</span> PRs
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* Token usage by team — bar chart */}
              <div className="lg:col-span-2 bg-white border border-carbon-gray-20 p-4">
                <div className="text-caption font-semibold text-carbon-gray-100 mb-4">
                  Token usage by team
                </div>
                <div className="space-y-3">
                  {rows.map((row) => (
                    <div key={row.team} className="flex items-center gap-3">
                      <span className="w-20 text-right text-caption text-carbon-gray-70 flex-shrink-0">
                        {row.team}
                      </span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="relative flex-1 h-6 bg-carbon-gray-10">
                          <motion.div
                            className={`h-full ${row.tier === 'premium' ? 'bg-carbon-blue-60' : 'bg-carbon-blue-60/50'}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(row.tokens / maxTokens) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                          {row.capped && (
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#da1e28]" title="Capped" />
                          )}
                        </div>
                        <span className="font-mono text-caption text-carbon-gray-70 w-12 flex-shrink-0">
                          {formatTokens(row.tokens)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-carbon-gray-50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-2 bg-carbon-blue-60 inline-block" /> Premium tier
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-2 bg-carbon-blue-60/50 inline-block" /> Standard tier
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-3 bg-[#da1e28] inline-block" /> Capped
                  </span>
                </div>
              </div>

              {/* Policy & cost panel */}
              <div className="space-y-3">
                {/* Cost per team */}
                <div className="bg-white border border-carbon-gray-20 p-4">
                  <div className="text-caption font-semibold text-carbon-gray-100 mb-3">
                    Cost per team
                  </div>
                  <div className="space-y-2">
                    {rows.map((row) => (
                      <div key={row.team} className="flex items-center justify-between">
                        <span className="text-caption text-carbon-gray-70">{row.team}</span>
                        <span className="font-mono text-caption font-semibold text-carbon-gray-100">
                          ${row.cost.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-carbon-gray-20 pt-2 flex items-center justify-between">
                      <span className="text-caption font-semibold text-carbon-gray-100">Total</span>
                      <span className="font-mono text-caption font-bold text-carbon-blue-60">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Policy enforcement */}
                <div className="bg-white border border-carbon-gray-20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Policy size={14} className="text-carbon-gray-60" />
                    <span className="text-caption font-semibold text-carbon-gray-100">
                      Policy enforcement
                    </span>
                  </div>
                  <div className="space-y-2">
                    {rows.map((row) => (
                      <div key={row.team} className="flex items-start gap-2">
                        {row.capped ? (
                          <Warning size={12} className="text-[#da1e28] flex-shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-3 h-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-carbon-green-50" />
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] text-carbon-gray-70">
                            <strong>{row.team}</strong>
                            {' — '}
                            <span className={`font-mono ${row.tier === 'premium' ? 'text-carbon-blue-60' : 'text-carbon-gray-60'}`}>
                              {row.tier}
                            </span>
                          </span>
                          {row.capped && (
                            <p className="text-[10px] text-[#da1e28] mt-0.5">
                              Đã đạt giới hạn — standard tier cap
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 px-3 py-2 bg-white border border-carbon-gray-20 flex flex-wrap items-center gap-3">
              <span className="text-[11px] text-carbon-gray-50">
                Nguồn: <span className="font-mono text-carbon-gray-70">Bobalytics · IBM Bob Settings</span>
              </span>
              <span className="ml-auto text-[11px] text-[#b28600] font-medium">
                ⚠ Dữ liệu mô phỏng — minh họa tính năng Bobalytics
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bobalytics caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-3 text-[11px] text-carbon-gray-50 text-center"
        >
          Bobalytics là tính năng governance tích hợp trong Bob Settings — theo dõi token usage, cost, và enforce policy theo team/project.
        </motion.p>
      </div>
    </section>
  );
}
