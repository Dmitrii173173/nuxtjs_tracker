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

# Install express and mongoose for backend
RUN yarn add express mongoose

# Copy backend API
COPY backend/api /app/backend/api

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output /app/.output

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Start both frontend and backend
CMD ["sh", "-c", "node .output/server/index.mjs & node backend/api/index.js"] 