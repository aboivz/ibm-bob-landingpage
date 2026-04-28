# Deployment Guide

## Prerequisites

- Node.js 20 LTS
- Docker 24+
- GitHub account với access đến GHCR

## Local development

```bash
nvm use
npm install
cp .env.example .env  # Cấu hình environment variables
npm run dev
```

## Build production

```bash
npm run build
# Output: dist/ (static HTML/CSS/JS)
```

## Docker (local)

```bash
docker compose up --build
# http://localhost:8080
```

## Deploy via Docker image

### Pull từ GHCR

```bash
docker pull ghcr.io/YOUR_ORG/bob-sdlc-landing/bob-landing:latest
docker run -p 80:80 ghcr.io/YOUR_ORG/bob-sdlc-landing/bob-landing:latest
```

### Với environment variables

```bash
docker run -p 80:80 \
  -e VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID \
  ghcr.io/YOUR_ORG/bob-sdlc-landing/bob-landing:latest
```

> **Lưu ý**: Vite build-time env vars (`VITE_*`) được bake vào bundle tại build time — không thể override lúc runtime. Cần rebuild image với env vars mới.

## GitHub Actions CI/CD

1. Push code lên `main` → trigger workflow tự động
2. Workflow: typecheck → lint → test → build → Docker build/push → verify size
3. Image push lên: `ghcr.io/YOUR_ORG/bob-sdlc-landing/bob-landing:latest`

Xem [.github/workflows/deploy.yml](.github/workflows/deploy.yml) để biết chi tiết.

## Verify image size

```bash
docker images bob-landing --format "{{.Size}}"
# Target: < 50MB
```

## nginx configuration

nginx config tại `docker/nginx.conf`:
- Gzip compression cho JS/CSS/fonts
- Cache headers: 1 year cho assets, no-cache cho `index.html`
- SPA fallback (all routes → `index.html`)
- Security headers: X-Frame-Options, CSP, etc.

## SSL/HTTPS

Phase 1: partner chịu trách nhiệm SSL termination (nginx reverse proxy hoặc load balancer phía trước).

Phase 2: có thể bổ sung Certbot/Let's Encrypt vào Docker setup nếu deploy trực tiếp.
