import { motion } from 'framer-motion';
import { Bot, Code, Security, TestTool, Document } from '@carbon/icons-react';
import { painPoints } from '@content/pain-points';

type PainIconKey = 'Code' | 'Security' | 'TestTool' | 'Document';
const painIconMap: Record<PainIconKey, typeof Code> = {
  Code, Security, TestTool, Document,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading">
            Bottleneck phát triển phần mềm —<br />
            <span className="text-carbon-gray-70">đội ngũ nào cũng gặp</span>
          </h2>
          <p className="section-subheading">
            Đây là những thách thức mà hầu hết đội ngũ engineering tăng trưởng nhanh đều gặp phải.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {painPoints.map((pain) => (
            <motion.div
              key={pain.id}
              variants={cardVariants}
              className="bg-white border border-carbon-gray-20 p-6 hover:border-carbon-blue-60 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ translateY: -2 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-carbon-gray-10 border border-carbon-gray-20 flex items-center justify-center flex-shrink-0 group-hover:bg-carbon-blue-60/10 group-hover:border-carbon-blue-60/30 transition-colors">
                  {(() => { const Icon = painIconMap[pain.icon as PainIconKey]; return Icon ? <Icon size={20} className="text-carbon-gray-70 group-hover:text-carbon-blue-60 transition-colors" /> : null; })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-heading-4 font-semibold text-carbon-gray-100 mb-2">
                    {pain.title}
                  </h3>
                  <p className="text-body text-carbon-gray-70 leading-relaxed mb-3">
                    {pain.description}
                  </p>
                  {pain.stat && (
                    <div className="inline-flex items-center gap-2 bg-carbon-gray-10 border border-carbon-gray-20 px-3 py-1.5 rounded-sm">
                      <div className="w-1.5 h-1.5 bg-carbon-red-60 rounded-full" />
                      <span className="text-caption text-carbon-gray-70 italic">{pain.stat}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 p-6 bg-carbon-blue-60/5 border border-carbon-blue-60/20 flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-6 h-6 bg-carbon-blue-60 flex items-center justify-center mt-0.5">
            <Bot size={14} className="text-white" />
          </div>
          <p className="text-body text-carbon-gray-70">
            <span className="font-semibold text-carbon-blue-60">Bob giải quyết từng bottleneck này ở mỗi bước SDLC.</span>
            {' '}Mỗi dev trong team làm được nhiều hơn — không cần tăng headcount.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
