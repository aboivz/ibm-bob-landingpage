import { Tag } from '@carbon/react';
import type { BobModeKey } from '@lib/types';

interface ModeChipProps {
  modeKey: BobModeKey;
  label: string;
  size?: 'sm' | 'md';
}

// Carbon Tag accepted type values for read-only tags
type TagType =
  | 'red' | 'magenta' | 'purple' | 'blue' | 'cyan'
  | 'teal' | 'green' | 'gray' | 'cool-gray' | 'warm-gray'
  | 'high-contrast' | 'outline';

const modeColors: Record<BobModeKey, TagType> = {
  ask: 'blue',
  plan: 'cyan',
  code: 'teal',
  advanced: 'purple',
  orchestrator: 'green',
  custom: 'magenta',
};

export function ModeChip({ modeKey, label, size = 'sm' }: ModeChipProps) {
  return (
    <Tag type={modeColors[modeKey]} size={size}>
      {label}
    </Tag>
  );
}
