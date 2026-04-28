import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@carbon/react';
import { ChevronRight, ChevronLeft } from '@carbon/icons-react';
import { useStepperState } from '@hooks/useStepperState';
import { sdlcSteps } from '@content/sdlc-steps';
import { StepCard } from '@components/ui/StepCard';
import { ArtifactViewer } from '@components/ui/ArtifactViewer';
import { ApprovalToggle } from '@components/ui/ApprovalToggle';
import { trackStepperInteraction } from '@lib/analytics';

const stepIds = sdlcSteps.map((s) => s.id);

export default function SDLCStepperSection() {
  const { state, currentIndex, isFirst, isLast, goNext, goPrev, selectStep, setApprovalMode } =
    useStepperState(stepIds);
  const artifactRef = useRef<HTMLDivElement>(null);

  const activeStep = sdlcSteps.find((s) => s.id === state.activeStepId) ?? sdlcSteps[0];

  const handleSelectStep = (stepId: string) => {
    selectStep(stepId);
    trackStepperInteraction(stepId);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        artifactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <section id="sdlc-stepper" className="bg-white section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="section-heading">Bob trong từng bước SDLC</h2>
              <p className="section-subheading">
                9 bước từ Spec đến Deploy — click vào từng bước để xem prompt và artifact Bob tạo ra.
              </p>
            </div>
            <div className="flex-shrink-0">
              <ApprovalToggle
                mode={state.approvalMode}
                onChange={setApprovalMode}
                size="sm"
                showDescription={false}
              />
            </div>
          </div>

          {/* Phase legend */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            {(['plan', 'build', 'verify', 'ship'] as const).map((phase) => (
              <div key={phase} className="flex items-center gap-1.5">
                <span className={`phase-badge ${
                  phase === 'plan' ? 'phase-plan' :
                  phase === 'build' ? 'phase-build' :
                  phase === 'verify' ? 'phase-verify' : 'phase-ship'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </span>
                <span className="text-caption text-carbon-gray-60">
                  {phase === 'plan' ? 'Spec & Arch' :
                   phase === 'build' ? 'Scaffold & Impl' :
                   phase === 'verify' ? 'Review & Test & Doc' : 'Deploy & Modernize'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main layout: stepper + artifact */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Step list (left column) */}
          <div className="lg:col-span-2">
            <div className="space-y-1.5">
              {sdlcSteps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isActive={step.id === state.activeStepId}
                  isCompleted={step.order < (activeStep?.order ?? 1)}
                  onClick={() => handleSelectStep(step.id)}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                kind="secondary"
                renderIcon={ChevronLeft}
                iconDescription="Bước trước"
                onClick={() => { goPrev(); if (window.innerWidth < 1024) setTimeout(() => artifactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}
                disabled={isFirst}
                className="flex-1"
              >
                Trước
              </Button>
              <Button
                size="sm"
                renderIcon={ChevronRight}
                iconDescription="Bước tiếp"
                onClick={() => { goNext(); if (window.innerWidth < 1024) setTimeout(() => artifactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}
                disabled={isLast}
                className="flex-1"
              >
                Tiếp
              </Button>
            </div>

            {/* Step counter */}
            <p className="text-caption text-carbon-gray-50 mt-3 text-center">
              Bước {currentIndex + 1} / {sdlcSteps.length}
            </p>
          </div>

          {/* Artifact viewer (right column) */}
          <div className="lg:col-span-3" ref={artifactRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={state.activeStepId}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Active step header */}
                <div className="mb-4 p-4 bg-carbon-gray-10 border border-carbon-gray-20">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-carbon-blue-60 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">{activeStep.order}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading-4 font-semibold text-carbon-gray-100 mb-1">
                        {activeStep.title}
                      </h3>
                      <p className="text-caption text-carbon-gray-70 mb-3">{activeStep.shortDesc}</p>

                      <div className="bg-white border border-carbon-gray-20 p-3 rounded-sm">
                        <div className="text-[11px] font-semibold text-carbon-gray-50 uppercase tracking-wider mb-1.5">
                          Bạn nói với Bob:
                        </div>
                        <p className="text-caption text-carbon-gray-100 italic leading-relaxed">
                          &ldquo;{activeStep.userPrompt}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-carbon-gray-50">
                          Thời gian ước tính:{' '}
                          <span className="text-carbon-gray-70">{activeStep.durationEstimate}</span>
                        </span>
                        <span className="font-mono text-[11px] text-carbon-blue-60">
                          {activeStep.bobMode.displayName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artifact */}
                <ArtifactViewer
                  artifact={activeStep.artifact}
                  approvalGate={activeStep.approvalGate}
                  approvalMode={state.approvalMode}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
