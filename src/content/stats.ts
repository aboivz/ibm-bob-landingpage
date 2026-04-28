import type { Stat } from '@lib/types';
import { IBM_SOURCES } from '@lib/constants';

export const ibmStats: Stat[] = [
  {
    value: '45%',
    label: 'Tăng năng suất trung bình',
    sublabel: 'Đo qua IBM internal teams',
    source: 'IBM Think Blog',
    sourceUrl: IBM_SOURCES.meetBob,
  },
  {
    value: '10,000+',
    label: 'IBMer đang dùng Bob',
    sublabel: 'Tính đến 2025',
    source: 'IBM Think Blog',
    sourceUrl: IBM_SOURCES.meetBob,
  },
  {
    value: '9 bước',
    label: 'SDLC hoàn chỉnh',
    sublabel: 'Spec → Deploy, một agent',
    source: 'IBM Bob Product',
    sourceUrl: IBM_SOURCES.bobProduct,
  },
  {
    value: '5 Modes',
    label: 'Vai trò chuyên biệt',
    sublabel: 'Code · Ask · Plan · Advanced · Orchestrator',
    source: 'IBM Bob Docs',
    sourceUrl: IBM_SOURCES.bobHomepage,
  },
];
