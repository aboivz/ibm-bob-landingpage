export type BobModeKey = 'ask' | 'plan' | 'code' | 'advanced' | 'orchestrator' | 'custom';

export type ArtifactType =
  | 'code'
  | 'spec'
  | 'diagram'
  | 'review-findings'
  | 'test'
  | 'docs'
  | 'config';

export type SDLCPhase = 'plan' | 'build' | 'verify' | 'ship';

export interface CodeHighlight {
  lineStart: number;
  lineEnd: number;
  note: string;
}

export interface Artifact {
  type: ArtifactType;
  filename: string;
  content: string;
  language?: string;
  highlights?: CodeHighlight[];
}

export interface BobMode {
  key: BobModeKey;
  displayName: string;
  icon: string;
  shortDesc: string;
  whenToUse: string;
  examplePrompt?: string;
  isCustom?: boolean;
}

export interface SDLCStep {
  id: string;
  order: number;
  phase: SDLCPhase;
  title: string;
  shortDesc: string;
  bobMode: BobMode;
  userPrompt: string;
  artifact: Artifact;
  approvalGate: boolean;
  durationEstimate: string;
}

export interface StepperState {
  activeStepId: string;
  expandedStepId: string | null;
  approvalMode: 'manual' | 'autonomous';
  autoPlay: boolean;
}

export type StepperAction =
  | { type: 'select'; stepId: string }
  | { type: 'toggleExpand'; stepId: string }
  | { type: 'setApprovalMode'; mode: 'manual' | 'autonomous' }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'reset' };

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
}

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
  source: string;
  sourceUrl: string;
}

export interface MCPIntegration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'repo' | 'ci' | 'issue' | 'infra' | 'monitoring';
}
