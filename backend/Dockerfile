# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy backend source code
COPY backend/api ./api

# Expose the port the app runs on
# Railway автоматически назначает порт через переменную PORT
ENV PORT=3001

# Set environment variables with defaults
ENV MONGODB_URI=mongodb://mongo:27017/nuxtdb
ENV NODE_ENV=production

# Expose the port that Railway will use
EXPOSE $PORT

# Start the backend server
CMD ["node", "api/index.js"] 