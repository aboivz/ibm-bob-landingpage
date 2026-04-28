import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartColumn } from '@carbon/icons-react';

const PRODUCTS = [
  { key: 'all', name: 'Tất cả' },
  { key: 'mortgage', name: 'Vay mua nhà' },
  { key: 'business', name: 'Vay kinh doanh' },
  { key: 'consumer', name: 'Vay tiêu dùng' },
  { key: 'credit', name: 'Thẻ tín dụng' },
] as const;

type ProductKey = (typeof PRODUCTS)[number]['key'];

const productData: Record<Exclude<ProductKey, 'all'>, { npl: number; outstanding: number; accounts: number }> = {
  mortgage: { npl: 2.6, outstanding: 1850, accounts: 4231 },
  business: { npl: 4.0, outstanding: 1120, accounts: 2156 },
  consumer: { npl: 5.8, outstanding: 780, accounts: 5482 },
  credit:   { npl: 3.2, outstanding: 530,  accounts: 978  },
};

const branchData = [
  { name: 'Hà Nội',    npl: 3.1, outstanding: 1580 },
  { name: 'TP.HCM',   npl: 2.9, outstanding: 1420 },
  { name: 'Đà Nẵng',  npl: 4.5, outstanding: 640  },
  { name: 'Cần Thơ',  npl: 5.8, outstanding: 380  },
  { name: 'Hải Phòng',npl: 3.7, outstanding: 260  },
];

const TOTAL = { npl: 3.6, outstanding: 4280, nplAmount: 154.1, accounts: 12847 };
const NPL_WARNING = 3.0; // threshold line (%)

function nplColor(npl: number) {
  if (npl < NPL_WARNING) return 'bg-carbon-green-50';
  if (npl < 5) return 'bg-carbon-yellow-30';
  return 'bg-[#da1e28]';
}

function nplTextColor(npl: number) {
  if (npl < NPL_WARNING) return 'text-carbon-green-50';
  if (npl < 5) return 'text-[#b28600]';
  return 'text-[#da1e28]';
}

interface KpiCardProps { label: string; value: string; sub?: string; highlight?: boolean }
function KpiCard({ label, value, sub, highlight }: KpiCardProps) {
  return (
    <div className={`p-4 bg-white border ${highlight ? 'border-carbon-blue-60' : 'border-carbon-gray-20'}`}>
      <div className="text-[11px] font-medium text-carbon-gray-50 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-semibold ${highlight ? 'text-carbon-blue-60' : 'text-carbon-gray-100'}`}>{value}</div>
      {sub && <div className="text-[11px] text-carbon-gray-50 mt-0.5">{sub}</div>}
    </div>
  );
}

interface HBarProps { name: string; npl: number; maxNpl: number; selected: boolean; dim: boolean }
function HBar({ name, npl, maxNpl, selected, dim }: HBarProps) {
  const width = Math.round((npl / maxNpl) * 100);
  return (
    <div className={`flex items-center gap-3 transition-opacity duration-150 ${dim ? 'opacity-35' : 'opacity-100'}`}>
      <span className="w-32 text-right text-caption text-carbon-gray-70 flex-shrink-0 truncate">{name}</span>
      <div className="flex-1 flex items-center gap-2">
        <div className="relative flex-1 h-5 bg-carbon-gray-10">
          <motion.div
            className={`h-full ${nplColor(npl)} ${selected ? 'ring-2 ring-carbon-blue-60 ring-inset' : ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Threshold line at NPL_WARNING */}
          <div
            className="absolute top-0 bottom-0 w-px bg-carbon-gray-60/60"
            style={{ left: `${(NPL_WARNING / maxNpl) * 100}%` }}
            title={`Ngưỡng cảnh báo ${NPL_WARNING}%`}
          />
        </div>
        <span className={`text-caption font-mono font-semibold w-10 flex-shrink-0 ${nplTextColor(npl)}`}>
          {npl.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function DashboardSection() {
  const [selected, setSelected] = useState<ProductKey>('all');

  const activeProduct = selected !== 'all' ? productData[selected] : null;
  const kpiNpl    = activeProduct ? activeProduct.npl      : TOTAL.npl;
  const kpiOut    = activeProduct ? activeProduct.outstanding : TOTAL.outstanding;
  const kpiNplAmt = activeProduct ? +(activeProduct.outstanding * activeProduct.npl / 100).toFixed(1) : TOTAL.nplAmount;
  const kpiAcc    = activeProduct ? activeProduct.accounts : TOTAL.accounts;

  const maxProductNpl = Math.max(...Object.values(productData).map((d) => d.npl));
  const maxBranchNpl  = Math.max(...branchData.map((d) => d.npl));

  return (
    <section id="dashboard" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-caption font-semibold text-carbon-green-50 uppercase tracking-wider">
              Kết quả hoàn chỉnh
            </span>
            <span className="text-caption text-carbon-gray-50">·</span>
            <span className="font-mono text-caption text-carbon-gray-50">Python · Streamlit · ~17 phút với Bob</span>
          </div>
          <h2 className="section-heading">Dashboard đang chạy</h2>
          <p className="section-subheading">
            Từ yêu cầu ban đầu đến dashboard production — đây là output cuối sau 9 bước SDLC với Bob.
          </p>
        </motion.div>

        {/* App frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border border-carbon-gray-30 shadow-lg overflow-hidden bg-white"
        >
          {/* App chrome / header bar */}
          <div className="bg-[#0f2027] px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-caption text-carbon-gray-30">localhost:8501</span>
            </div>
            <span className="font-mono text-[11px] text-carbon-gray-50">
              loan_portfolio.csv · 12,847 rows loaded
            </span>
            <span className="text-[11px] text-carbon-gray-50 hidden md:block">
              Last updated: 02/04/2025 09:15
            </span>
          </div>

          {/* App title bar (Streamlit-style) */}
          <div className="bg-[#1e2a33] px-5 py-3 border-b border-[#0d1b22]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-carbon-blue-60 flex items-center justify-center flex-shrink-0">
                <ChartColumn size={12} className="text-white" />
              </div>
              <span className="text-white font-semibold text-body">
                Loan Portfolio Risk Dashboard
              </span>
              <span className="ml-auto text-[11px] text-carbon-gray-50">
                NPL = Nợ nhóm 3–5 / Tổng dư nợ
              </span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="bg-carbon-gray-10 p-4 md:p-5">

            {/* Product filter */}
            <div className="bg-white border border-carbon-gray-20 p-3 mb-4 flex flex-wrap items-center gap-2">
              <span className="text-caption font-medium text-carbon-gray-70 mr-1 flex-shrink-0">
                Sản phẩm:
              </span>
              {PRODUCTS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelected(p.key)}
                  className={`px-3 py-1 text-caption font-medium transition-all duration-150 border ${
                    selected === p.key
                      ? 'bg-carbon-blue-60 text-white border-carbon-blue-60'
                      : 'bg-white text-carbon-gray-70 border-carbon-gray-20 hover:border-carbon-blue-60/50 hover:text-carbon-blue-60'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <KpiCard
                label="NPL Ratio"
                value={`${kpiNpl.toFixed(1)}%`}
                sub={kpiNpl >= 5 ? '⚠ Vượt ngưỡng' : kpiNpl >= NPL_WARNING ? '△ Cần theo dõi' : '✓ Trong ngưỡng'}
                highlight
              />
              <KpiCard
                label="Tổng dư nợ"
                value={`${kpiOut.toLocaleString()} tỷ`}
                sub="VND"
              />
              <KpiCard
                label="Nợ xấu"
                value={`${kpiNplAmt.toFixed(1)} tỷ`}
                sub="VND"
              />
              <KpiCard
                label="Số hợp đồng"
                value={kpiAcc.toLocaleString()}
                sub="hợp đồng đang hoạt động"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* By Product */}
              <div className="bg-white border border-carbon-gray-20 p-4">
                <div className="text-caption font-semibold text-carbon-gray-100 mb-1">
                  NPL Ratio theo Sản phẩm
                </div>
                <div className="text-[11px] text-carbon-gray-50 mb-3 flex items-center gap-2">
                  <span className="inline-block w-3 h-px bg-carbon-gray-50 border-t border-dashed border-carbon-gray-50" />
                  Ngưỡng cảnh báo {NPL_WARNING}%
                </div>
                <div className="space-y-2.5">
                  {(Object.entries(productData) as [Exclude<ProductKey, 'all'>, typeof productData.mortgage][]).map(([key, d]) => (
                    <HBar
                      key={key}
                      name={PRODUCTS.find((p) => p.key === key)!.name}
                      npl={d.npl}
                      maxNpl={maxProductNpl * 1.1}
                      selected={selected === key}
                      dim={selected !== 'all' && selected !== key}
                    />
                  ))}
                </div>
              </div>

              {/* By Branch */}
              <div className="bg-white border border-carbon-gray-20 p-4">
                <div className="text-caption font-semibold text-carbon-gray-100 mb-1">
                  NPL Ratio theo Chi Nhánh
                </div>
                <div className="text-[11px] text-carbon-gray-50 mb-3 flex items-center gap-2">
                  <span className="inline-block w-3 h-px bg-carbon-gray-50 border-t border-dashed border-carbon-gray-50" />
                  Ngưỡng cảnh báo {NPL_WARNING}%
                </div>
                <div className="space-y-2.5">
                  {branchData.map((b) => (
                    <HBar
                      key={b.name}
                      name={b.name}
                      npl={b.npl}
                      maxNpl={maxBranchNpl * 1.1}
                      selected={false}
                      dim={false}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 px-3 py-2 bg-white border border-carbon-gray-20 flex items-center gap-2">
              <span className="text-[11px] text-carbon-gray-50">
                Mã nguồn:{' '}
                <span className="font-mono text-carbon-gray-70">risk_calc.py · test_risk_calc.py · app.py</span>
              </span>
              <span className="ml-auto text-[11px] text-[#b28600] font-medium">
                ⚠ Dữ liệu mô phỏng — minh họa output của Bob SDLC Demo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Time comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: 'Thời gian với Bob', value: '~17 phút', sub: 'Spec → Code → Test → Deploy', color: 'text-carbon-green-50' },
            { label: 'Thủ công ước tính', value: '~2 tuần', sub: 'Cùng output, không có Bob', color: 'text-carbon-gray-50' },
            { label: 'Lines of code', value: '~400 LOC', sub: 'Python · 6 test cases · Dockerfile', color: 'text-carbon-blue-60' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-carbon-gray-20 px-5 py-4 text-center">
              <div className={`text-2xl font-semibold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-caption font-medium text-carbon-gray-100">{s.label}</div>
              <div className="text-[11px] text-carbon-gray-50 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
