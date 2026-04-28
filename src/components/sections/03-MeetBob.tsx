import { motion } from 'framer-motion';
import { Bot, Code, Chemistry, Security, Connect } from '@carbon/icons-react';
import { ibmStats } from '@content/stats';
import { IBM_SOURCES } from '@lib/constants';

const differentiators = [
  {
    Icon: Code,
    title: 'Bắt đầu từ Spec, không phải từ code',
    description:
      'Bob hiểu yêu cầu business, thiết kế kiến trúc, rồi mới implement. Copilot/Cursor chỉ bắt đầu ở bước code — Bob bắt đầu từ bước đầu tiên.',
  },
  {
    Icon: Chemistry,
    title: 'Skills & Custom Modes',
    description:
      'Team định nghĩa workflow tái sử dụng qua Skills (.bob/skills/) — dạy Bob cách làm theo convention riêng: Spec Architect, Test Generator, Security Reviewer.',
  },
  {
    Icon: Security,
    title: 'Auto-Approve kiểm soát được',
    description:
      'Bob luôn hỏi trước khi thực thi — đọc file, chạy lệnh, gọi MCP. Bật Auto-Approve từng loại action theo mức độ trust. Phù hợp môi trường có yêu cầu compliance và audit trail.',
  },
  {
    Icon: Connect,
    title: 'Beyond IDE với MCP',
    description:
      'Bob kết nối GitHub, Jira, Jenkins, monitoring tools qua MCP server. Không bị giới hạn trong editor — orchestrate cả workflow.',
  },
];

export default function MeetBobSection() {
  return (
    <section id="meet-bob" className="bg-white section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-carbon-blue-60 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <span className="text-caption font-semibold text-carbon-blue-60 uppercase tracking-wider">
                  Meet Bob
                </span>
              </div>

              <h2 className="section-heading mb-4">Bob là gì?</h2>

              <p className="text-body-lg text-carbon-gray-70 leading-relaxed mb-6">
                Bob là <strong className="text-carbon-gray-100">AI SDLC Partner</strong> của IBM. Khác với coding assistant, Bob tham gia toàn bộ vòng đời phát triển phần mềm:{' '}
                <span className="text-carbon-blue-60 font-medium">từ Spec & Plan</span> đến{' '}
                <span className="text-carbon-blue-60 font-medium">Containerize & Deploy</span>.
              </p>

              <p className="text-body text-carbon-gray-70 leading-relaxed mb-8">
                Được xây dựng từ chương trình triển khai nội bộ IBM với 10,000+ developers.
                Bob augment từng người trong team — engineer vẫn kiểm soát mọi quyết định kỹ thuật.
              </p>

              <a
                href={IBM_SOURCES.meetBob}
                target="_blank"
                rel="noopener noreferrer"
                className="text-carbon-blue-60 text-body hover:text-carbon-blue-70 underline"
              >
                Đọc thêm: IBM Think Blog — Meet Bob →
              </a>
            </motion.div>

            {/* Differentiators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 space-y-4"
            >
              {differentiators.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-carbon-blue-60/10 border border-carbon-blue-60/30 flex items-center justify-center text-carbon-blue-60 mt-0.5">
                    <d.Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-carbon-gray-100 mb-1">
                      {d.title}
                    </h4>
                    <p className="text-caption text-carbon-gray-70 leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {ibmStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className={`p-6 border hover:shadow-md transition-shadow ${
                    i === 0
                      ? 'bg-carbon-blue-60 border-carbon-blue-60 col-span-2'
                      : 'bg-carbon-gray-10 border-carbon-gray-20'
                  }`}
                >
                  <div
                    className={`text-4xl font-semibold mb-1 ${
                      i === 0 ? 'text-white' : 'text-carbon-blue-60'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-body font-medium mb-1 ${
                      i === 0 ? 'text-blue-100' : 'text-carbon-gray-100'
                    }`}
                  >
                    {stat.label}
                  </div>
                  {stat.sublabel && (
                    <div
                      className={`text-caption ${i === 0 ? 'text-blue-200' : 'text-carbon-gray-60'}`}
                    >
                      {stat.sublabel}
                    </div>
                  )}
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[11px] mt-3 block underline ${
                      i === 0 ? 'text-blue-200 hover:text-white' : 'text-carbon-gray-50 hover:text-carbon-blue-60'
                    }`}
                  >
                    Nguồn: {stat.source}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-caption text-carbon-gray-50 italic"
            >
              Số liệu đo từ IBM internal program năm 2024–2025.
              Kết quả thực tế có thể khác nhau tùy môi trường triển khai.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
