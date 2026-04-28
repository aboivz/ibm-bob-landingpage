import type { BobMode } from '@lib/types';

export const bobModes: BobMode[] = [
  {
    key: 'ask',
    displayName: 'Ask Mode',
    icon: 'Chat',
    shortDesc: 'Hỏi-đáp về codebase, giải thích code, phân tích dependency — không thay đổi file',
    whenToUse:
      'Khi cần hiểu code chưa quen, research API, hoặc debug context. Ask Mode chỉ đọc file và dùng browser — không edit, không execute.',
    examplePrompt: 'Giải thích logic tính toán NPL ratio trong file risk_calc.py',
  },
  {
    key: 'plan',
    displayName: 'Plan Mode',
    icon: 'TaskComplete',
    shortDesc: 'Thiết kế kiến trúc, viết spec, tạo implementation plan — chỉ edit file markdown',
    whenToUse:
      'Trước khi viết code, cần spec rõ ràng. Plan Mode đóng vai technical leader — thu thập context rồi tạo plan chi tiết. Chỉ có thể edit file markdown, không động source code.',
    examplePrompt: 'Đề xuất kiến trúc cho dashboard NPL, output ARCHITECTURE.md',
  },
  {
    key: 'code',
    displayName: 'Code Mode',
    icon: 'Code',
    shortDesc: 'Viết, sửa, refactor code — tool cốt lõi cho implementation hàng ngày',
    whenToUse:
      'Khi đã có plan rõ ràng và muốn Bob implement. Code Mode truy cập đầy đủ read/write/execute, được tối ưu cho cost-efficiency trong development thông thường.',
    examplePrompt: 'Tạo file structure theo ARCHITECTURE.md đã duyệt',
  },
  {
    key: 'advanced',
    displayName: 'Advanced Mode',
    icon: 'Settings',
    shortDesc: 'Phiên bản nâng cao của Code Mode — full access tất cả tool, dùng cho task phức tạp',
    whenToUse:
      'Khi cần toàn bộ công cụ: browser, MCP, execute, và Skills. Bắt buộc khi dùng Skills (.bob/skills/). Phù hợp cho code review sâu, migration, và workflow multi-step.',
    examplePrompt: 'Review toàn bộ diff trước PR, tìm bug và security issue trong risk_calc.py',
  },
  {
    key: 'orchestrator',
    displayName: 'Orchestrator Mode',
    icon: 'Collaborate',
    shortDesc: 'Điều phối task phức tạp — tự chuyển mode phù hợp theo từng bước',
    whenToUse:
      'Khi task cần nhiều bước với các vai trò khác nhau. Orchestrator tự động chọn Code/Plan/Advanced theo yêu cầu từng subtask — không cần switch mode thủ công.',
    examplePrompt: 'Từ SPEC.md, scaffold → implement → test → document toàn bộ dashboard NPL',
  },
  {
    key: 'custom',
    displayName: 'Custom Mode',
    icon: 'UserMultiple',
    shortDesc: 'Mode tùy chỉnh per-project hoặc global — định nghĩa persona, rules, tool access',
    whenToUse:
      'Khi team muốn chuẩn hóa workflow. Tạo Custom Mode để định nghĩa persona riêng (Spec Architect, Test Generator, Security Reviewer) với instruction và tool permission cụ thể.',
    examplePrompt: 'Dùng Custom Mode "Test Generator" để viết pytest cho risk_calc.py',
    isCustom: true,
  },
];

export const customModeExamples = [
  {
    name: 'Spec Architect',
    description: 'Tạo SPEC.md chuẩn, bao gồm requirements, schema, AC, edge cases theo template của team',
    scope: 'project',
  },
  {
    name: 'Test Generator',
    description: 'Sinh test case theo convention pytest của team, bao gồm happy + edge + error path',
    scope: 'project',
  },
  {
    name: 'Docs Architect',
    description: 'Tạo README, ARCHITECTURE.md, API doc theo template đã định nghĩa sẵn',
    scope: 'global',
  },
  {
    name: 'Security Reviewer',
    description: 'Review code với lens bảo mật: OWASP Top 10, secrets, SQL injection, compliance',
    scope: 'global',
  },
];
