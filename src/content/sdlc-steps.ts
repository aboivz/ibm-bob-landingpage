import type { SDLCStep } from '@lib/types';
import { bobModes } from './bob-modes';
import { codeSnippets } from './code-snippets';

const modeMap = Object.fromEntries(bobModes.map((m) => [m.key, m]));

export const sdlcSteps: SDLCStep[] = [
  {
    id: 'spec-plan',
    order: 1,
    phase: 'plan',
    title: 'Spec & Plan',
    shortDesc: 'Tạo requirements đầy đủ từ yêu cầu tự nhiên',
    bobMode: { ...modeMap['plan'], displayName: 'Plan Mode + Skill: Spec Architect' },
    userPrompt:
      'Tôi cần dashboard Python theo dõi tỷ lệ NPL của portfolio cho vay, breakdown theo sản phẩm và chi nhánh. Data từ file CSV.',
    artifact: {
      type: 'spec',
      filename: 'SPEC.md',
      content: codeSnippets.specMd,
      language: 'markdown',
    },
    approvalGate: false,
    durationEstimate: '~2 phút với Bob · ~2 ngày thủ công',
  },
  {
    id: 'architecture',
    order: 2,
    phase: 'plan',
    title: 'Architecture',
    shortDesc: 'Thiết kế kiến trúc, component diagram, file structure',
    bobMode: modeMap['plan'],
    userPrompt: 'Dựa vào SPEC.md, đề xuất kiến trúc đơn giản nhất cho dashboard này.',
    artifact: {
      type: 'diagram',
      filename: 'ARCHITECTURE.md',
      content: codeSnippets.architectureMd,
      language: 'markdown',
    },
    approvalGate: false,
    durationEstimate: '~1 phút với Bob · ~4 giờ thủ công',
  },
  {
    id: 'scaffolding',
    order: 3,
    phase: 'build',
    title: 'Scaffolding',
    shortDesc: 'Tạo file structure — Bob xin xác nhận trước khi tạo file (Auto-Approve: Tắt)',
    bobMode: modeMap['code'],
    userPrompt: 'Tạo file structure theo ARCHITECTURE.md đã duyệt.',
    artifact: {
      type: 'config',
      filename: 'File tree',
      content: codeSnippets.scaffoldingTree,
      language: 'text',
    },
    approvalGate: true,
    durationEstimate: '~30 giây với Bob · ~30 phút thủ công',
  },
  {
    id: 'implementation',
    order: 4,
    phase: 'build',
    title: 'Implementation',
    shortDesc: 'Viết business logic với Literate Coding — code có context',
    bobMode: modeMap['code'],
    userPrompt:
      'Viết function tính NPL ratio. NPL = group 3–5 / total outstanding. Cần filter theo product và branch.',
    artifact: {
      type: 'code',
      filename: 'risk_calc.py',
      content: codeSnippets.riskCalcPy,
      language: 'python',
      highlights: [
        { lineStart: 1, lineEnd: 5, note: 'Module imports và constants cho NPL statuses' },
        { lineStart: 8, lineEnd: 32, note: 'Core function: tính NPL ratio với optional filter' },
        { lineStart: 34, lineEnd: 50, note: 'Breakdown by product/branch' },
      ],
    },
    approvalGate: true,
    durationEstimate: '~3 phút với Bob · ~2 giờ thủ công',
  },
  {
    id: 'code-review',
    order: 5,
    phase: 'verify',
    title: 'Code Review',
    shortDesc: 'Agentic Review với reasoning — Bob tìm 3 issue trong risk_calc.py',
    bobMode: modeMap['advanced'],
    userPrompt: 'Review toàn bộ diff của risk_calc.py trước khi merge — tìm bug, security issue, và code quality.',
    artifact: {
      type: 'review-findings',
      filename: 'Review Findings',
      content: codeSnippets.reviewFindings,
      language: 'markdown',
      highlights: [
        { lineStart: 1, lineEnd: 15, note: '[HIGH] Division-by-zero risk' },
        { lineStart: 17, lineEnd: 32, note: '[MEDIUM] Missing input validation' },
        { lineStart: 34, lineEnd: 50, note: '[LOW] DRY violation — logic lặp lại' },
      ],
    },
    approvalGate: false,
    durationEstimate: '~1 phút với Bob · ~2 giờ manual review',
  },
  {
    id: 'testing',
    order: 6,
    phase: 'verify',
    title: 'Testing',
    shortDesc: 'Custom "Test Generator" sinh 6 test case: happy + edge + error path',
    bobMode: { ...modeMap['advanced'], displayName: 'Advanced + Skill: Test Generator' },
    userPrompt:
      'Generate test cho risk_calc.py. Cần cover happy path, edge case (portfolio rỗng, toàn normal), và error path (missing column).',
    artifact: {
      type: 'test',
      filename: 'test_risk_calc.py',
      content: codeSnippets.testRiskCalcPy,
      language: 'python',
      highlights: [
        { lineStart: 26, lineEnd: 30, note: 'Happy path: ratio đúng với dữ liệu sample' },
        { lineStart: 38, lineEnd: 44, note: 'Edge: portfolio rỗng → 0.0, không crash' },
        { lineStart: 47, lineEnd: 51, note: 'Error: thiếu cột → KeyError rõ ràng' },
      ],
    },
    approvalGate: false,
    durationEstimate: '~2 phút với Bob · ~3 giờ thủ công',
  },
  {
    id: 'documentation',
    order: 7,
    phase: 'verify',
    title: 'Documentation',
    shortDesc: 'Custom "Docs Architect" tạo README, ARCHITECTURE, API doc',
    bobMode: { ...modeMap['advanced'], displayName: 'Advanced + Skill: Docs Architect' },
    userPrompt:
      'Tạo README đầy đủ (setup, run, deploy), ARCHITECTURE.md cập nhật, và API doc cho risk_calc.py.',
    artifact: {
      type: 'docs',
      filename: 'README.md',
      content: `# Loan Portfolio Risk Dashboard

## Quickstart
\`\`\`bash
pip install -r requirements.txt
streamlit run app.py
\`\`\`

## Chạy test
\`\`\`bash
pytest tests/ -v --cov=risk_calc
\`\`\`

## Deploy
\`\`\`bash
docker build -t loan-risk-dashboard .
docker run -p 8501:8501 loan-risk-dashboard
\`\`\`

## API Reference — risk_calc.py

### \`calculate_npl_ratio(df, product?, branch?) → float\`
Tính NPL ratio cho toàn bộ portfolio hoặc một segment.

**Parameters**:
- \`df\`: DataFrame với schema chuẩn (xem SPEC.md)
- \`product\`: Filter theo product (optional)
- \`branch\`: Filter theo branch (optional)

**Returns**: Float từ 0.0 đến 1.0 (0% → 100% NPL)

**Raises**: \`KeyError\` nếu DataFrame thiếu cột bắt buộc`,
      language: 'markdown',
    },
    approvalGate: false,
    durationEstimate: '~3 phút với Bob · ~1 ngày thủ công',
  },
  {
    id: 'containerize-deploy',
    order: 8,
    phase: 'ship',
    title: 'Containerize & Deploy',
    shortDesc: 'Code Mode + GitHub MCP — Dockerfile, docker-compose, GitHub Actions',
    bobMode: { ...modeMap['code'], displayName: 'Code Mode + GitHub MCP' },
    userPrompt:
      'Đóng gói ứng dụng bằng Docker multi-stage và setup GitHub Actions CI/CD push lên GHCR.',
    artifact: {
      type: 'config',
      filename: '.github/workflows/deploy.yml',
      content: codeSnippets.githubActionsYml,
      language: 'yaml',
    },
    approvalGate: true,
    durationEstimate: '~5 phút với Bob · ~4 giờ thủ công',
  },
  {
    id: 'modernization',
    order: 9,
    phase: 'ship',
    title: '(Bonus) Modernization',
    shortDesc: 'Teaser: migrate Streamlit → FastAPI khi cần scale',
    bobMode: { ...modeMap['orchestrator'], displayName: 'Orchestrator Mode' },
    userPrompt:
      'Có thể migrate dashboard này sang FastAPI + React nếu cần multi-user và custom UI không? Cho tôi migration plan.',
    artifact: {
      type: 'docs',
      filename: 'MIGRATION_PLAN.md',
      content: codeSnippets.modernizationPlan,
      language: 'markdown',
    },
    approvalGate: false,
    durationEstimate: '~5 phút với Bob · ~1 tuần thủ công',
  },
];
