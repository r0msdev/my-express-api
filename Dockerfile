# syntax=docker/dockerfile:1
# Multi-stage build for production

# Base stage: shared foundation for all stages
FROM node:24-alpine AS base
WORKDIR /app

# Upgrade OS packages to patch known CVEs
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

# Upgrade npm to latest to patch bundled dependency CVEs (tar, minimatch)
RUN npm install -g npm@latest

# Stage 1: Build
FROM base AS builder

# Install dependencies using bind mounts — more efficient than COPY for
# files that are only needed during the build and not in the final image
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM base AS production

LABEL org.opencontainers.image.title="my-express-api" \
      org.opencontainers.image.description="Express API service" \
      org.opencontainers.image.version="1.0.0"

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built files from builder stage
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist

# Copy API documentation
COPY --chown=nodejs:nodejs --from=builder /app/docs ./docs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "--enable-source-maps", "dist/index.js"]
