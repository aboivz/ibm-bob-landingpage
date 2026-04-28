export const codeSnippets = {
  specMd: `# Loan Portfolio Risk Dashboard
## Overview
Dashboard Python/Streamlit theo dõi tỷ lệ NPL (Non-Performing Loan) của portfolio cho vay,
breakdown theo sản phẩm và chi nhánh.

## Functional Requirements
- FR-01: Load file \`loan_portfolio.csv\` với schema định nghĩa sẵn
- FR-02: Tính NPL ratio = Σoutstanding[NPL3,4,5] ÷ Σoutstanding
- FR-03: Breakdown theo product (mortgage, consumer, sme)
- FR-04: Breakdown theo branch
- FR-05: Filter theo date range (disbursement_date)
- FR-06: Export filtered data ra CSV

## Schema: loan_portfolio.csv
| Column | Type | Description |
|--------|------|-------------|
| loan_id | string | ID khoản vay (unique) |
| product | enum | mortgage / consumer / sme |
| branch | string | Tên chi nhánh |
| outstanding | float | Dư nợ còn lại (VNĐ) |
| status | enum | normal / NPL3 / NPL4 / NPL5 |
| disbursement_date | date | YYYY-MM-DD |

## Acceptance Criteria
- AC-01: NPL ratio hiển thị đúng với dữ liệu synthetic test
- AC-02: Filter date range ảnh hưởng đúng đến tính toán
- AC-03: Export CSV chứa đúng cột và format
- AC-04: Page load < 3s với 100k rows
- AC-05: Không crash khi portfolio trống (edge case)`,

  architectureMd: `# Architecture: Loan Portfolio Risk Dashboard

## Component Diagram
\`\`\`
┌─────────────────────────────────────────┐
│           Streamlit App (app.py)         │
│  ┌─────────────┐  ┌──────────────────┐  │
│  │  UI Layer   │  │  Filter Controls │  │
│  └──────┬──────┘  └────────┬─────────┘  │
│         │                  │            │
│  ┌──────▼──────────────────▼─────────┐  │
│  │        risk_calc.py               │  │
│  │  calculate_npl_ratio()            │  │
│  │  breakdown_by_product()           │  │
│  │  breakdown_by_branch()            │  │
│  └──────────────────┬────────────────┘  │
│                     │                  │
│  ┌──────────────────▼────────────────┐  │
│  │        data_loader.py             │  │
│  │  load_portfolio() → DataFrame     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
\`\`\`

## File Structure
\`\`\`
loan-risk-dashboard/
├── app.py              # Streamlit entry point
├── risk_calc.py        # Business logic: NPL calculation
├── data_loader.py      # CSV load + validation
├── data/
│   └── loan_portfolio.csv
├── tests/
│   └── test_risk_calc.py
└── Dockerfile
\`\`\``,

  scaffoldingTree: `loan-risk-dashboard/
├── app.py
├── risk_calc.py
├── data_loader.py
├── requirements.txt
├── data/
│   └── loan_portfolio.csv       # synthetic data
├── tests/
│   └── test_risk_calc.py
├── Dockerfile
└── README.md`,

  riskCalcPy: `import pandas as pd
from typing import Optional


NPL_STATUSES = {"NPL3", "NPL4", "NPL5"}


def calculate_npl_ratio(
    df: pd.DataFrame,
    product: Optional[str] = None,
    branch: Optional[str] = None,
) -> float:
    """
    Tính NPL ratio cho portfolio hoặc một segment.

    NPL Ratio = Σ outstanding[NPL3,4,5] / Σ outstanding
    """
    if df.empty:
        return 0.0

    mask = pd.Series(True, index=df.index)
    if product:
        mask &= df["product"] == product
    if branch:
        mask &= df["branch"] == branch

    subset = df[mask]

    if subset["outstanding"].sum() == 0:
        return 0.0

    npl_outstanding = subset.loc[
        subset["status"].isin(NPL_STATUSES), "outstanding"
    ].sum()
    total_outstanding = subset["outstanding"].sum()

    return float(npl_outstanding / total_outstanding)


def breakdown_by_product(df: pd.DataFrame) -> pd.DataFrame:
    """NPL ratio breakdown theo product."""
    products = df["product"].unique()
    rows = []
    for prod in products:
        ratio = calculate_npl_ratio(df, product=prod)
        total = df[df["product"] == prod]["outstanding"].sum()
        rows.append({"product": prod, "npl_ratio": ratio, "total_outstanding": total})
    return pd.DataFrame(rows).sort_values("npl_ratio", ascending=False)


def breakdown_by_branch(df: pd.DataFrame) -> pd.DataFrame:
    """NPL ratio breakdown theo branch."""
    branches = df["branch"].unique()
    rows = []
    for branch in branches:
        ratio = calculate_npl_ratio(df, branch=branch)
        total = df[df["branch"] == branch]["outstanding"].sum()
        rows.append({"branch": branch, "npl_ratio": ratio, "total_outstanding": total})
    return pd.DataFrame(rows).sort_values("npl_ratio", ascending=False)`,

  reviewFindings: `## Bob Agentic Review — risk_calc.py

### Findings (3 issues)

---

#### [HIGH] Division-by-zero risk — calculate_npl_ratio()
**File**: risk_calc.py, line 28
**Issue**: Khi \`total_outstanding == 0\` sau khi filter, hàm trả về 0.0 — nhưng nếu
data corrupt (có NaN trong cột outstanding), \`sum()\` có thể trả về NaN,
dẫn đến \`NaN / NaN\` thay vì 0.

**Suggestion**: Thêm check \`df["outstanding"].notna().all()\` trước khi tính,
hoặc dùng \`df["outstanding"].fillna(0)\`.

---

#### [MEDIUM] Missing input validation — DataFrame schema
**File**: risk_calc.py, line 14
**Issue**: Hàm không validate schema của DataFrame đầu vào.
Nếu caller pass DataFrame thiếu cột \`status\` hoặc \`outstanding\`,
sẽ raise \`KeyError\` không rõ nguyên nhân.

**Suggestion**: Thêm validation function riêng:
\`\`\`python
REQUIRED_COLUMNS = {"loan_id", "outstanding", "status", "product", "branch"}

def validate_portfolio(df: pd.DataFrame) -> None:
    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")
\`\`\`

---

#### [LOW] Function quá dài — breakdown_by_product/branch
**File**: risk_calc.py, line 42–60
**Issue**: Hai hàm \`breakdown_by_product\` và \`breakdown_by_branch\` có logic
lặp lại gần hoàn toàn. Vi phạm DRY principle.

**Suggestion**: Extract thành hàm generic \`breakdown_by(df, column)\`:
\`\`\`python
def breakdown_by(df: pd.DataFrame, column: str) -> pd.DataFrame:
    groups = df[column].unique()
    rows = [
        {column: g, "npl_ratio": calculate_npl_ratio(df, **{column: g}), ...}
        for g in groups
    ]
    return pd.DataFrame(rows).sort_values("npl_ratio", ascending=False)
\`\`\``,

  testRiskCalcPy: `import pytest
import pandas as pd
from risk_calc import calculate_npl_ratio, breakdown_by_product


# --- Fixtures ---

@pytest.fixture
def sample_portfolio() -> pd.DataFrame:
    return pd.DataFrame({
        "loan_id": ["L001", "L002", "L003", "L004"],
        "product": ["mortgage", "consumer", "mortgage", "sme"],
        "branch": ["HN", "HCM", "HN", "HCM"],
        "outstanding": [1_000_000, 500_000, 800_000, 200_000],
        "status": ["normal", "NPL3", "NPL5", "normal"],
        "disbursement_date": ["2023-01-01"] * 4,
    })


# --- Happy path ---

def test_npl_ratio_overall(sample_portfolio):
    # NPL = 500k + 800k = 1.3M / 2.5M total = 0.52
    ratio = calculate_npl_ratio(sample_portfolio)
    assert abs(ratio - 0.52) < 0.001


def test_npl_ratio_by_product(sample_portfolio):
    ratio = calculate_npl_ratio(sample_portfolio, product="consumer")
    assert ratio == 1.0  # L002 là NPL3, 100%


def test_breakdown_by_product_returns_all_products(sample_portfolio):
    result = breakdown_by_product(sample_portfolio)
    assert set(result["product"]) == {"mortgage", "consumer", "sme"}


# --- Edge cases ---

def test_empty_portfolio_returns_zero():
    empty_df = pd.DataFrame(columns=["loan_id", "outstanding", "status", "product", "branch"])
    assert calculate_npl_ratio(empty_df) == 0.0


def test_all_normal_returns_zero(sample_portfolio):
    all_normal = sample_portfolio.copy()
    all_normal["status"] = "normal"
    assert calculate_npl_ratio(all_normal) == 0.0


# --- Error path ---

def test_missing_column_raises():
    bad_df = pd.DataFrame({"loan_id": ["L001"], "outstanding": [100]})
    with pytest.raises(KeyError):
        calculate_npl_ratio(bad_df)`,

  dockerfilePy: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -q --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]`,

  githubActionsYml: `name: Build & Push Docker Image

on:
  push:
    branches: [main]
  release:
    types: [published]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}/bob-landing

jobs:
  build-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile
          push: true
          platforms: linux/amd64,linux/arm64
          tags: |
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}`,

  modernizationPlan: `## Kế hoạch Modernization: Streamlit → FastAPI + React

### Lý do migrate
- Streamlit phù hợp với prototype / internal tool
- Khi cần: multi-user, custom UI, API-first, mobile responsive → FastAPI + React

### Bob Migration Plan

#### Phase 1 — Extract business logic (1 ngày)
- Tách \`risk_calc.py\` thành module thuần Python (không phụ thuộc Streamlit)
- Đây là phần đã làm đúng từ đầu — không cần thay đổi

#### Phase 2 — FastAPI layer (0.5 ngày)
\`\`\`python
# main.py (FastAPI)
from fastapi import FastAPI
from risk_calc import calculate_npl_ratio, breakdown_by_product

app = FastAPI()

@app.get("/api/npl-ratio")
async def get_npl_ratio(product: str | None = None):
    df = load_portfolio()
    return {"ratio": calculate_npl_ratio(df, product=product)}
\`\`\`

#### Phase 3 — React frontend (2 ngày)
- Dùng lại thiết kế dashboard, thêm filter tương tác
- Chart library: Recharts hoặc Apache ECharts

### Diff sample: app.py → main.py
- Remove: \`st.title()\`, \`st.dataframe()\`, Streamlit widgets
- Add: FastAPI routes, Pydantic response models, CORS middleware`,
};
