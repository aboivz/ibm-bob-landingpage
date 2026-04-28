export const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID ?? '';

export const IBM_SOURCES = {
  meetBob: 'https://www.ibm.com/think/news/meet-bob-developer-productivity',
  bobProduct: 'https://www.ibm.com/products/bob',
  bobHomepage: 'https://bob.ibm.com/',
  bobAnnouncement: 'https://www.ibm.com/new/announcements/ibm-project-bob',
  bobGithub: 'https://github.com/IBM/ibm-bob',
  carbonDesign: 'https://carbondesignsystem.com/',
  bobTutorial: 'https://www.ibm.com/think/tutorials/ai-code-documentation-ibm-bob',
  aiCodingAgent: 'https://www.ibm.com/products/ai-coding-agent',
} as const;

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Trang chủ' },
  { id: 'problem', label: 'Vấn đề' },
  { id: 'meet-bob', label: 'Meet Bob' },
  { id: 'use-case', label: 'Use Case' },
  { id: 'sdlc-stepper', label: 'SDLC Demo' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'modes', label: 'Modes' },
  { id: 'approval', label: 'Auto-Approve' },
  { id: 'mcp', label: 'MCP' },
  { id: 'security', label: 'Security' },
  { id: 'roi', label: 'ROI' },
] as const;

export const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

