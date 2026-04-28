import { motion } from 'framer-motion';
import { Button } from '@carbon/react';
import { ArrowDown } from '@carbon/icons-react';

const SDLC_STEPS = ['Spec', 'Plan', 'Code', 'Review', 'Test', 'Deploy'];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center gradient-mesh-bg grain-overlay overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-carbon-blue-60/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-carbon-teal-40/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="section-container relative z-10 py-32 mt-14">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6 max-w-4xl"
        >
          Bob —{' '}
          <span className="text-carbon-blue-60">AI SDLC Partner</span>
          <br />
          cho đội ngũ phát triển phần mềm
        </motion.h1>

        {/* SDLC flow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-2 flex-wrap mb-6"
        >
          {SDLC_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="font-mono text-caption md:text-body font-medium text-carbon-gray-30">
                {step}
              </span>
              {i < SDLC_STEPS.length - 1 && (
                <span className="text-carbon-blue-60 text-body">→</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-body-lg text-carbon-gray-30 max-w-2xl mb-10 leading-relaxed"
        >
          Bob tham gia từ Spec đến Deploy — viết code, review, sinh test, tạo PR, trigger CI/CD.{' '}
          <span className="text-white font-medium">Mỗi action đều chờ bạn xác nhận.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            renderIcon={ArrowDown}
            onClick={() => scrollTo('sdlc-stepper')}
          >
            Xem Bob trong action
          </Button>
          <Button
            size="lg"
            kind="tertiary"
            onClick={() => scrollTo('roi')}
          >
            Xem số liệu ROI
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-carbon-gray-80"
        >
          {[
            { value: '45%', label: 'tăng năng suất đo được*' },
            { value: '10,000+', label: 'IBMer đang dùng Bob*' },
            { value: '9 bước', label: 'SDLC từ Spec đến Deploy' },
            { value: '5 Modes', label: 'Code · Ask · Plan · Advanced · Orchestrator' },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
              <div className="text-caption text-carbon-gray-50">{stat.label}</div>
            </div>
          ))}
          <p className="w-full text-[11px] text-carbon-gray-60 mt-2">
            * Nguồn:{' '}
            <a
              href="https://www.ibm.com/think/news/meet-bob-developer-productivity"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-carbon-gray-30"
            >
              IBM Think Blog — Meet Bob
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
