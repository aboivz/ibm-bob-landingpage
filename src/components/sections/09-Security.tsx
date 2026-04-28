import { motion } from 'framer-motion';
import { InlineNotification, Tag } from '@carbon/react';
import { Security, Warning, CheckmarkFilled } from '@carbon/icons-react';

const securityFeatures = [
  {
    title: 'Secrets Detection built-in',
    description:
      'Bob phát hiện API key, credentials, token bị hardcode trong source code trước khi commit — không cần plugin bổ sung.',
    available: true,
  },
  {
    title: 'On-premises / Private Cloud deployment',
    description:
      'Bob thiết kế hỗ trợ triển khai on-premises hoặc private cloud — data không rời infrastructure của doanh nghiệp.',
    available: true,
  },
  {
    title: 'Audit log đầy đủ',
    description:
      'Mọi interaction với Bob đều được log: ai prompt gì, Bob đề xuất gì, ai approve. Phục vụ compliance audit.',
    available: true,
  },
  {
    title: 'Bobalytics: Cost & Policy Control',
    description:
      'Dashboard theo dõi token usage, cost per team/project, và enforce policy (ví dụ: giới hạn model tier cho từng team).',
    available: true,
  },
];

const complianceItems = [
  { name: 'PCI DSS', scope: 'Thiết kế hỗ trợ tuân thủ', available: true },
  { name: 'ISO 27001', scope: 'Thiết kế hỗ trợ tuân thủ', available: true },
  { name: 'FedRAMP', scope: 'Thiết kế hỗ trợ tuân thủ', available: true },
  { name: 'HIPAA', scope: 'Thiết kế hỗ trợ tuân thủ', available: true },
  {
    name: 'Thông tư 09/2020/TT-NHNN',
    scope: 'Thiết kế hỗ trợ — cần validate với compliance team',
    available: false,
  },
  { name: 'SOC 2 Type II', scope: 'Trong roadmap', available: false },
];

export default function SecuritySection() {
  return (
    <section id="security" className="bg-carbon-gray-100 section-padding relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Security size={24} className="text-carbon-blue-60" />
            <span className="text-caption font-semibold text-carbon-blue-60 uppercase tracking-wider">
              Security & Compliance
            </span>
          </div>
          <h2 className="text-heading-2 font-semibold text-white mb-4">
            Bảo mật từ thiết kế, phù hợp ngành regulated
          </h2>
          <p className="text-body-lg text-carbon-gray-30 max-w-2xl">
            Bob được xây dựng với security-first mindset. Audit log đầy đủ, deployment on-premises,
            và compliance support cho các ngành có yêu cầu quản lý chặt chẽ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Security features */}
          <div className="lg:col-span-3 space-y-3">
            {securityFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 p-4 bg-carbon-gray-90 border border-carbon-gray-80"
              >
                <CheckmarkFilled size={20} className="text-carbon-green-50 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-caption font-semibold text-white mb-1">{feat.title}</h4>
                  <p className="text-caption text-carbon-gray-50 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-carbon-gray-90 border border-carbon-gray-80 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag type="blue">Compliance</Tag>
              </div>
              <div className="space-y-3">
                {complianceItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-3 py-2 border-b border-carbon-gray-80 last:border-0"
                  >
                    <div>
                      <div className="text-caption font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-carbon-gray-60 mt-0.5">{item.scope}</div>
                    </div>
                    {item.available ? (
                      <CheckmarkFilled size={16} className="text-carbon-green-50 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Warning size={16} className="text-carbon-yellow-30 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <InlineNotification
            kind="warning"
            title="Disclaimer:"
            subtitle="Bob hiện ở giai đoạn preview. Một số tính năng compliance đang trong roadmap. Phrasing 'thiết kế hỗ trợ tuân thủ' KHÔNG đồng nghĩa với 'đã được chứng nhận'. Liên hệ IBM Partner để biết chi tiết lộ trình deploy on-premises và validate với compliance team của bạn."
          />
        </motion.div>
      </div>
    </section>
  );
}
