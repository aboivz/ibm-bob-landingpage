export const useCase = {
  title: 'Loan Portfolio Risk Dashboard',
  subtitle: 'Use case demo xuyên suốt — Python · Streamlit · Pandas',
  disclaimer:
    'Đây là walkthrough mô phỏng. Tất cả output của Bob trong demo này là nội dung được chuẩn bị sẵn để minh họa khả năng. Để xem Bob chạy trực tiếp trên codebase ngân hàng của bạn, liên hệ partner.',
  persona: {
    role: 'Data Analyst / Junior Dev',
    context: 'Ngân hàng thương mại VN, team 4 người',
    goal: 'Xây dashboard theo dõi tỷ lệ NPL của portfolio cho vay theo sản phẩm và chi nhánh',
  },
  techStack: ['Python 3.11', 'Streamlit', 'Pandas', 'pytest'],
  projectSize: '~10 file, 200–400 LOC',
  schema: {
    filename: 'loan_portfolio.csv',
    columns: [
      { name: 'loan_id', type: 'string', description: 'ID khoản vay' },
      { name: 'product', type: 'string', description: 'Sản phẩm: mortgage / consumer / sme' },
      { name: 'branch', type: 'string', description: 'Chi nhánh' },
      { name: 'outstanding', type: 'float', description: 'Dư nợ còn lại (VNĐ)' },
      { name: 'status', type: 'string', description: 'Phân loại: NPL3 / NPL4 / NPL5 / normal' },
      { name: 'disbursement_date', type: 'date', description: 'Ngày giải ngân' },
    ],
  },
  nplFormula: 'NPL Ratio = Σ outstanding [status ∈ {NPL3, NPL4, NPL5}] ÷ Σ outstanding',
};
