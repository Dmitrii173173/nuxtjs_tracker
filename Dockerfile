# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output /app/.output

# Set environment variables with defaults that Railway может переопределить
ENV HOST=0.0.0.0
# Railway автоматически назначает порт через переменную PORT
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port that Railway will use
EXPOSE $PORT

# Start only the frontend application
CMD ["node", ".output/server/index.mjs"] 