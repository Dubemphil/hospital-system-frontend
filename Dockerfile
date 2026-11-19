# ==============================================================================
# Multi-stage Build for Hospital React Frontend SPA
# Production Nginx Alpine Web Server
# ==============================================================================

# Stage 1: Build the React Application
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies with legacy peer deps for compatibility
COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source code and build production bundle
COPY . .
ENV CI=false
ENV REACT_APP_API_BASE_URL=""
RUN npm run build

# Stage 2: Serve with Production-grade Nginx Alpine
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Clean default Nginx static files
RUN rm -rf ./*

# Copy built artifacts from builder stage
COPY --from=builder /app/build ./

# Copy custom Nginx configuration for SPA routing & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
