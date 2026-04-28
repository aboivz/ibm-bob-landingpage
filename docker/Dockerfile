# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
