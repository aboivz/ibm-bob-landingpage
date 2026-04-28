import type { PainPoint } from '@lib/types';

export const painPoints: PainPoint[] = [
  {
    id: 'legacy-code',
    title: 'Legacy code không ai dám đụng',
    description:
      'COBOL, Java 8, RPG — không ai còn nhớ logic. Mỗi lần sửa là một rủi ro. Onboard dev mới mất 3–6 tháng chỉ để đọc hiểu codebase.',
    icon: 'Code',
    stat: '~40% codebase enterprise trên Java 8 hoặc cũ hơn',
  },
  {
    id: 'compliance-bottleneck',
    title: 'Compliance review chậm 1–2 tuần',
    description:
      'Mỗi release qua nhiều gate security, compliance, architecture review. Dev done, nhưng deploy chờ audit xong. Time-to-market kéo dài.',
    icon: 'Security',
    stat: 'Trung bình 8–12 ngày review mỗi release',
  },
  {
    id: 'test-coverage',
    title: 'Test coverage dưới 40%',
    description:
      'Không đủ thời gian viết test. Regression xảy ra thường xuyên. Mỗi release là canh bạc — cần rollback 2–3 lần/quý.',
    icon: 'TestTool',
    stat: '<40% coverage là mức phổ biến trong enterprise software',
  },
  {
    id: 'doc-debt',
    title: 'Tài liệu lỗi thời hoặc không tồn tại',
    description:
      'API doc viết 2 năm trước, README không reflect hiện tại. Dev mới mất nhiều giờ hỏi người cũ để hiểu một feature đơn giản.',
    icon: 'Document',
    stat: '>60% dev time bị lãng phí do thiếu doc',
  },
];
