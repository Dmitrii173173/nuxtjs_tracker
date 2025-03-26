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
EXPOSE 3001

# Start the backend server
CMD ["node", "api/index.js"] 