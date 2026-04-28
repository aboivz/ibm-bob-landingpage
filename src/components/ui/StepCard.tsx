import { motion } from 'framer-motion';
import { CheckmarkFilled, CircleDash, Locked } from '@carbon/icons-react';
import { ModeChip } from './ModeChip';
import type { SDLCStep } from '@lib/types';
import type { BobModeKey } from '@lib/types';

interface StepCardProps {
  step: SDLCStep;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const phaseLabels: Record<SDLCStep['phase'], string> = {
  plan: 'Plan',
  build: 'Build',
  verify: 'Verify',
  ship: 'Ship',
};

const phaseClasses: Record<SDLCStep['phase'], string> = {
  plan: 'phase-plan',
  build: 'phase-build',
  verify: 'phase-verify',
  ship: 'phase-ship',
};

export function StepCard({ step, isActive, isCompleted, onClick }: StepCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 border transition-all duration-200 cursor-pointer
        ${isActive
          ? 'border-carbon-blue-60 bg-blue-50/30'
          : isCompleted
            ? 'border-carbon-gray-20 bg-carbon-gray-10 hover:border-carbon-gray-30'
            : 'border-carbon-gray-20 bg-white hover:border-carbon-blue-60/50 hover:bg-blue-50/10'
        }
      `}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.998 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {isCompleted ? (
            <CheckmarkFilled size={20} className="text-carbon-green-50" />
          ) : isActive ? (
            <div className="w-5 h-5 rounded-full bg-carbon-blue-60 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{step.order}</span>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-carbon-gray-30 flex items-center justify-center">
              <span className="text-carbon-gray-50 text-[10px] font-bold">{step.order}</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className={`text-body font-semibold ${isActive ? 'text-carbon-blue-60' : isCompleted ? 'text-carbon-gray-70' : 'text-carbon-gray-100'}`}
            >
              {step.title}
            </span>
            {step.approvalGate && (
              <Locked size={12} className="text-carbon-yellow-30 flex-shrink-0" />
            )}
          </div>

          <p className="text-caption text-carbon-gray-60 mb-2">{step.shortDesc}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <ModeChip modeKey={step.bobMode.key as BobModeKey} label={step.bobMode.displayName} size="sm" />
            <span className={`phase-badge ${phaseClasses[step.phase]}`}>
              {phaseLabels[step.phase]}
            </span>
          </div>
        </div>

        <CircleDash
          size={16}
          className={`flex-shrink-0 mt-1 transition-transform duration-200 ${isActive ? 'rotate-90 text-carbon-blue-60' : 'text-carbon-gray-30'}`}
        />
      </div>
    </motion.button>
  );
}
