# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Ajuste l'outputPath si besoin (par défaut: dist/<nom-app>)
ARG DIST_DIR=dist/app
RUN npm run build
# --- Runtime stage (Nginx statique) ---
FROM nginx:1.27-alpine AS runtime
ARG DIST_DIR=dist/app
COPY --from=build /app/${DIST_DIR} /usr/share/nginx/html
# simple cache headers
RUN printf 'add_header Cache-Control "public, max-age=31536000";\n' > /etc/nginx/conf.d/cache.conf
