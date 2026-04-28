import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Branch, Task, ContinuousDeployment, DocumentTasks, ChartLine,
} from '@carbon/icons-react';

interface Integration {
  category: string;
  Icon: typeof Branch;
  tools: string[];
  description: string;
  available: boolean;
}

const integrations: Integration[] = [
  {
    category: 'Source Control',
    Icon: Branch,
    tools: ['GitHub', 'GitLab', 'Bitbucket'],
    description: 'Tạo PR với description chi tiết, đọc diff, comment review, quản lý branch — Bob làm việc trực tiếp với repo.',
    available: true,
  },
  {
    category: 'Issue Tracking',
    Icon: Task,
    tools: ['Jira', 'Linear', 'GitHub Issues'],
    description: 'Đọc requirement từ ticket, map sang task cụ thể, cập nhật status khi hoàn thành.',
    available: true,
  },
  {
    category: 'CI/CD',
    Icon: ContinuousDeployment,
    tools: ['Jenkins', 'GitHub Actions', 'GitLab CI'],
    description: 'Trigger pipeline, đọc build logs, identify root cause của test failure và suggest fix.',
    available: true,
  },
  {
    category: 'Documentation',
    Icon: DocumentTasks,
    tools: ['Confluence', 'Notion'],
    description: 'Tạo và cập nhật technical doc theo template có sẵn — đồng bộ với code changes.',
    available: true,
  },
  {
    category: 'Monitoring',
    Icon: ChartLine,
    tools: ['Datadog', 'Grafana', 'Splunk'],
    description: 'Đọc alerts, correlate lỗi với code changes gần nhất, suggest hotfix — hiện trong roadmap.',
    available: false,
  },
];

export default function MCPSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="mcp" className="bg-carbon-gray-10 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="section-heading">Bob không bị giới hạn trong IDE</h2>
          <p className="section-subheading">
            Một lệnh Bob có thể đọc Jira ticket, tạo branch, implement, tạo PR và trigger CI/CD — không cần dev switch context.
            MCP (Model Context Protocol) là lớp kết nối.
          </p>
        </motion.div>

        {/* Bob hub */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="flex items-center gap-4 p-4 bg-carbon-blue-60 border border-carbon-blue-60">
            <div className="w-10 h-10 bg-white/20 flex items-center justify-center flex-shrink-0">
              <Bot size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-body">Bob — AI SDLC Partner</div>
              <div className="text-blue-200 text-caption">
                IDE (VS Code · JetBrains) → MCP Server → Dev Workflow
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-caption text-blue-200">
              <span className="w-2 h-2 bg-carbon-green-50 rounded-full" />
              MCP active
            </div>
          </div>

          {/* Connector ticks */}
          <div className="grid grid-cols-5 px-0">
            {integrations.map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className={`w-px h-4 ${i === 4 ? 'border-l-2 border-dashed border-carbon-gray-40' : 'bg-carbon-gray-40'}`} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {integrations.map((int, i) => (
            <motion.div
              key={int.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative bg-white p-4 cursor-default transition-all duration-200 ${
                int.available
                  ? 'border border-carbon-gray-20 hover:border-carbon-blue-60/60 hover:shadow-md'
                  : 'border border-dashed border-carbon-gray-30 opacity-75 hover:opacity-90'
              }`}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-3">
                <int.Icon size={20} className="text-carbon-gray-60" />
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 ${
                    int.available
                      ? 'bg-carbon-green-50/10 text-carbon-green-50'
                      : 'bg-carbon-gray-20 text-carbon-gray-50'
                  }`}
                >
                  {int.available ? 'Available' : 'Roadmap'}
                </span>
              </div>

              <div className="text-caption font-semibold text-carbon-gray-100 mb-2">
                {int.category}
              </div>

              {/* Tool pills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {int.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono bg-carbon-gray-10 border border-carbon-gray-20 px-1.5 py-0.5 text-carbon-gray-70"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Description — visible on hover */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredIndex === i ? 1 : 0, height: hoveredIndex === i ? 'auto' : 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <p className="text-[11px] text-carbon-gray-60 leading-relaxed border-t border-carbon-gray-10 pt-2">
                  {int.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Use case callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 p-5 bg-white border border-carbon-gray-20"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-carbon-blue-60/10 border border-carbon-blue-60/30 flex items-center justify-center text-carbon-blue-60">
              <Bot size={16} />
            </div>
            <div>
              <h4 className="text-body font-semibold text-carbon-gray-100 mb-1">
                Use case: Bob + GitHub MCP + Jira
              </h4>
              <p className="text-caption text-carbon-gray-70 leading-relaxed">
                Bob đọc requirement từ Jira ticket →  tạo branch →  implement theo spec →  tự tạo PR
                với description chi tiết →  trigger CI/CD. Không cần dev switch context giữa Jira,
                IDE, GitHub, và Jenkins.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
