import { motion } from 'framer-motion';
import { InlineNotification, Tag } from '@carbon/react';
import { ArrowDown, UserProfile, Code, TableOfContents } from '@carbon/icons-react';
import { useCase } from '@content/use-case';

export default function UseCaseIntroSection() {
  return (
    <section id="use-case" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag type="cyan">Use Case Demo</Tag>
            <Tag type="outline">Python · Streamlit · Pandas</Tag>
          </div>
          <h2 className="section-heading">{useCase.title}</h2>
          <p className="section-subheading">
            Một use case banking thực tế, đủ nhỏ để Bob show end-to-end SDLC.
          </p>
        </motion.div>

        <InlineNotification
          kind="info"
          title="Demo walkthrough:"
          subtitle={useCase.disclaimer}
          lowContrast
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Persona */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-carbon-gray-20 p-6"
          >
            <h3 className="text-body font-semibold text-carbon-gray-100 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-carbon-blue-60/10 border border-carbon-blue-60/30 flex items-center justify-center text-carbon-blue-60">
                <UserProfile size={12} />
              </span>
              Persona
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-caption text-carbon-gray-50 mb-0.5">Vai trò</dt>
                <dd className="text-caption font-medium text-carbon-gray-100">{useCase.persona.role}</dd>
              </div>
              <div>
                <dt className="text-caption text-carbon-gray-50 mb-0.5">Ngữ cảnh</dt>
                <dd className="text-caption font-medium text-carbon-gray-100">{useCase.persona.context}</dd>
              </div>
              <div>
                <dt className="text-caption text-carbon-gray-50 mb-0.5">Mục tiêu</dt>
                <dd className="text-caption font-medium text-carbon-gray-100">{useCase.persona.goal}</dd>
              </div>
            </dl>
          </motion.div>

          {/* Tech stack & size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-carbon-gray-20 p-6"
          >
            <h3 className="text-body font-semibold text-carbon-gray-100 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-carbon-teal-60/10 border border-carbon-teal-60/30 flex items-center justify-center text-carbon-teal-60">
                <Code size={12} />
              </span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {useCase.techStack.map((tech) => (
                <Tag key={tech} type="teal" size="sm">
                  {tech}
                </Tag>
              ))}
            </div>
            <div className="border-t border-carbon-gray-20 pt-4">
              <div className="text-caption text-carbon-gray-50 mb-1">Quy mô project</div>
              <div className="font-mono text-caption font-medium text-carbon-gray-100">
                {useCase.projectSize}
              </div>
            </div>
          </motion.div>

          {/* Schema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-carbon-gray-20 p-6"
          >
            <h3 className="text-body font-semibold text-carbon-gray-100 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-carbon-yellow-30/20 border border-carbon-yellow-30/50 flex items-center justify-center text-carbon-gray-100">
                <TableOfContents size={12} />
              </span>
              Data Schema
            </h3>
            <div className="font-mono text-caption text-carbon-gray-60 mb-3">
              {useCase.schema.filename}
            </div>
            <div className="space-y-1.5">
              {useCase.schema.columns.map((col) => (
                <div key={col.name} className="flex items-baseline gap-2">
                  <span className="font-mono text-caption font-medium text-carbon-blue-60 flex-shrink-0">
                    {col.name}
                  </span>
                  <span className="text-[11px] text-carbon-gray-50">{col.type}</span>
                  <span className="text-[11px] text-carbon-gray-60 truncate">{col.description}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-2 bg-carbon-gray-10 border border-carbon-gray-20">
              <div className="text-[11px] text-carbon-gray-50 mb-1">NPL Formula:</div>
              <code className="font-mono text-[11px] text-carbon-gray-100">{useCase.nplFormula}</code>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-5 bg-carbon-blue-60/5 border border-carbon-blue-60/20 flex items-center gap-4"
        >
          <ArrowDown size={24} className="text-carbon-blue-60 flex-shrink-0" />
          <p className="text-body text-carbon-gray-70">
            <strong className="text-carbon-gray-100">Scroll xuống</strong> để xem Bob đi qua từng bước SDLC với project này.
            Mỗi bước có prompt thực tế và artifact Bob trả về.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
