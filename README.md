# IBM Bob — AI SDLC Partner Landing Page

Landing page tiếng Việt showcase capabilities của IBM Bob cho thị trường ngân hàng Việt Nam.

## Quickstart

```bash
nvm use                    # Node 20 LTS
npm install
npm run dev                # http://localhost:5173
```

## Development commands

```bash
npm run dev          # Dev server (Vite HMR)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run format       # Prettier
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright E2E
```

## Docker (production build)

```bash
docker compose up --build  # http://localhost:8080
```

## Environment variables

Copy `.env.example` sang `.env` và điền:

```bash
cp .env.example .env
```

| Variable | Mô tả | Mặc định |
|----------|-------|----------|
| `VITE_FORM_ENDPOINT` | Endpoint cho contact form (Formspree) | `https://httpbin.org/post` |
| `VITE_ANALYTICS_ID` | Plausible / GA4 ID (optional) | - |
| `VITE_PARTNER_EMAIL` | Email liên hệ partner | `contact@ibm.com` |

## File structure

```
src/
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # 11 sections (01-Hero → 11-CTA)
│   └── ui/           # Reusable primitives
├── content/          # Copy text + demo data (edit here)
├── hooks/            # useScrollSpy, useStepperState
├── lib/              # types, constants, analytics
└── styles/           # SCSS + Tailwind
```

## Thay đổi nội dung

Toàn bộ copy text và demo data nằm trong `src/content/`. Chỉnh sửa file `.ts` tương ứng — không cần động vào component.

## Deployment

Xem [DEPLOYMENT.md](./DEPLOYMENT.md) để biết hướng dẫn chi tiết.

## Sources

- [IBM Think Blog — Meet Bob](https://www.ibm.com/think/news/meet-bob-developer-productivity)
- [IBM Bob Product Page](https://www.ibm.com/products/bob)
- [bob.ibm.com](https://bob.ibm.com/)
